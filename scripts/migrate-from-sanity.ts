import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config'
import { memberRankMapping } from '../src/utils/member-rank'
import { projectStatusMapping } from '../src/utils/project-status'

interface SanityDoc {
  _id: string
  _type: string
  _createdAt?: string
  _updatedAt?: string
  [key: string]: unknown
}

interface SanityImageAsset extends SanityDoc {
  url: string
  mimeType?: string
  originalFilename?: string
  extension?: string
}

interface SanityImageRef {
  _type?: string
  asset?: { _ref?: string }
}

interface PortableTextSpan {
  _type: 'span'
  text?: string
  marks?: string[]
}

interface PortableTextMarkDef {
  _key: string
  _type: string
  href?: string
}

interface PortableTextBlock {
  _type: string
  _key?: string
  style?: string
  listItem?: 'bullet' | 'number'
  level?: number
  children?: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
  // image
  asset?: { _ref?: string }
  // code
  code?: string
  language?: string
  // actionButton
  text?: string
  href?: string
  // youtubeEmbed
  url?: string
  body?: PortableTextBlock[]
}

const VALID_RANKS = new Set(memberRankMapping.map((r) => r.value))
const VALID_STATUSES = new Set(projectStatusMapping.map((s) => s.value))

const CODE_LANG_MAP: Record<string, string> = {
  text: 'text',
  sh: 'bash',
  shell: 'bash',
  bash: 'bash',
  powershell: 'bash',
  dockerfile: 'docker',
  docker: 'docker',
  css: 'css',
  html: 'markup',
  xml: 'markup',
  markup: 'markup',
  java: 'java',
  js: 'javascript',
  javascript: 'javascript',
  json: 'json',
  kt: 'kotlin',
  kotlin: 'kotlin',
  md: 'markdown',
  markdown: 'markdown',
  py: 'python',
  python: 'python',
  rb: 'ruby',
  ruby: 'ruby',
  sql: 'sql',
  tsx: 'tsx',
  ts: 'typescript',
  typescript: 'typescript',
  yml: 'yaml',
  yaml: 'yaml',
}

function normalizeCodeLang(lang?: string): string {
  if (!lang) return 'text'
  return CODE_LANG_MAP[lang.toLowerCase()] ?? 'text'
}

function makeObjectId(): string {
  return crypto.randomBytes(12).toString('hex')
}

function makeTextNode(text: string, format = 0) {
  return {
    type: 'text',
    version: 1,
    text,
    format,
    mode: 'normal',
    style: '',
    detail: 0,
  }
}

function convertSpans(
  spans: PortableTextSpan[] | undefined,
  markDefs: PortableTextMarkDef[] | undefined,
) {
  const defMap = new Map<string, PortableTextMarkDef>()
  for (const def of markDefs ?? []) {
    defMap.set(def._key, def)
  }

  const out: Record<string, unknown>[] = []
  for (const span of spans ?? []) {
    if (span._type !== 'span') continue
    const text = span.text ?? ''
    let format = 0
    let linkDef: PortableTextMarkDef | undefined

    for (const mark of span.marks ?? []) {
      if (mark === 'strong') format |= 1
      else if (mark === 'em') format |= 2
      else if (mark === 'strike-through') format |= 4
      else if (mark === 'underline') format |= 8
      else if (mark === 'code') format |= 16
      else if (defMap.has(mark)) {
        linkDef = defMap.get(mark)
      }
    }

    const textNode = makeTextNode(text, format)
    if (linkDef && linkDef.href) {
      const cleanedHref = linkDef.href.trim().replace(/^mailto:\s+/, 'mailto:')
      out.push({
        type: 'link',
        version: 3,
        id: makeObjectId(),
        fields: {
          linkType: 'custom',
          url: cleanedHref,
          newTab:
            cleanedHref.startsWith('http://') ||
            cleanedHref.startsWith('https://'),
        },
        children: [textNode],
        direction: 'ltr',
        format: '',
        indent: 0,
      })
    } else {
      out.push(textNode)
    }
  }

  return out
}

function convertPortableTextToLexical(
  blocks: PortableTextBlock[] | undefined,
  mediaIdBySanityRef: Map<string, number>,
): Record<string, unknown> {
  const rootChildren: Record<string, unknown>[] = []
  const input = Array.isArray(blocks) ? blocks : []

  let currentList: {
    listType: 'bullet' | 'number'
    items: Record<string, unknown>[]
  } | null = null

  const flushList = () => {
    if (!currentList) return
    rootChildren.push({
      type: 'list',
      version: 1,
      listType: currentList.listType,
      tag: currentList.listType === 'number' ? 'ol' : 'ul',
      start: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: currentList.items,
    })
    currentList = null
  }

  for (const block of input) {
    if (block._type === 'block') {
      const inlineChildren = convertSpans(block.children, block.markDefs)

      if (block.listItem === 'bullet' || block.listItem === 'number') {
        if (!currentList || currentList.listType !== block.listItem) {
          flushList()
          currentList = { listType: block.listItem, items: [] }
        }
        currentList.items.push({
          type: 'listitem',
          version: 1,
          value: currentList.items.length + 1,
          direction: 'ltr',
          format: '',
          indent: Math.max(0, (block.level ?? 1) - 1),
          children: inlineChildren,
        })
        continue
      }

      flushList()

      const style = block.style ?? 'normal'
      if (style === 'h1' || style === 'h2' || style === 'h3' || style === 'h4') {
        rootChildren.push({
          type: 'heading',
          version: 1,
          tag: style,
          direction: 'ltr',
          format: '',
          indent: 0,
          children: inlineChildren,
        })
      } else if (style === 'blockquote') {
        rootChildren.push({
          type: 'quote',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          children: inlineChildren,
        })
      } else {
        rootChildren.push({
          type: 'paragraph',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          textStyle: '',
          children: inlineChildren,
        })
      }
      continue
    }

    flushList()

    if (block._type === 'image') {
      const ref = block.asset?._ref
      const mediaId = ref ? mediaIdBySanityRef.get(ref) : undefined
      if (mediaId) {
        rootChildren.push({
          type: 'upload',
          version: 3,
          id: makeObjectId(),
          relationTo: 'media',
          value: mediaId,
          fields: {},
          format: '',
        })
      }
    } else if (block._type === 'code') {
      rootChildren.push({
        type: 'block',
        version: 2,
        format: '',
        fields: {
          id: makeObjectId(),
          blockName: '',
          blockType: 'codeBlock',
          language: normalizeCodeLang(block.language),
          code: block.code ?? '',
        },
      })
    } else if (block._type === 'actionButton') {
      if (block.href && block.text) {
        rootChildren.push({
          type: 'block',
          version: 2,
          format: '',
          fields: {
            id: makeObjectId(),
            blockName: '',
            blockType: 'actionButton',
            text: block.text,
            href: block.href,
          },
        })
      }
    } else if (block._type === 'youtubeEmbed') {
      if (block.url) {
        rootChildren.push({
          type: 'block',
          version: 2,
          format: '',
          fields: {
            id: makeObjectId(),
            blockName: '',
            blockType: 'youtubeEmbed',
            url: block.url,
            body: block.body?.length
              ? convertPortableTextToLexical(block.body, mediaIdBySanityRef)
              : undefined,
          },
        })
      }
    }
  }

  flushList()

  if (rootChildren.length === 0) {
    rootChildren.push({
      type: 'paragraph',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      textStyle: '',
      children: [],
    })
  }

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: rootChildren,
    },
  }
}

async function loadNdjson(): Promise<SanityDoc[]> {
  const fileArgIdx = process.argv.indexOf('--file')
  let raw: string

  if (fileArgIdx !== -1 && process.argv[fileArgIdx + 1]) {
    const filePath = path.resolve(process.argv[fileArgIdx + 1])
    console.log(`Reading Sanity export from ${filePath}...`)
    raw = fs.readFileSync(filePath, 'utf8')
  } else {
    const token = process.env.SANITY_API_TOKEN
    if (!token) {
      throw new Error(
        'Provide either --file <path-to-production.ndjson> or set SANITY_API_TOKEN.',
      )
    }
    const projectId = process.env.SANITY_PROJECT_ID || 'xxexxe77'
    const dataset = process.env.SANITY_DATASET || 'production'
    const url = `https://${projectId}.api.sanity.io/v2023-06-21/data/export/${dataset}`
    console.log(`Exporting Sanity dataset ${projectId}/${dataset}...`)
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
      throw new Error(`Sanity export failed: ${res.status} ${res.statusText}`)
    }
    raw = await res.text()
  }

  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line) as SanityDoc)
}

function getCacheDir(): string | null {
  const idx = process.argv.indexOf('--asset-cache')
  if (idx !== -1 && process.argv[idx + 1]) {
    const dir = path.resolve(process.argv[idx + 1])
    fs.mkdirSync(dir, { recursive: true })
    return dir
  }
  return null
}

async function migrateAssets(
  payload: Payload,
  assets: Map<string, SanityImageAsset>,
  referencedRefs: Set<string>,
  cacheDir: string | null,
): Promise<Map<string, number>> {
  const mediaIdByRef = new Map<string, number>()

  // Load any previously migrated media for idempotency
  const existing = await payload.find({
    collection: 'media',
    limit: 2000,
    depth: 0,
  })
  for (const doc of existing.docs) {
    if (doc.sanityAssetId) {
      mediaIdByRef.set(doc.sanityAssetId, doc.id)
    }
  }

  const toUpload = [...referencedRefs].filter(
    (ref) => assets.has(ref) && !mediaIdByRef.has(ref),
  )
  console.log(
    `Assets: ${referencedRefs.size} referenced, ${mediaIdByRef.size} already migrated, ${toUpload.length} to upload.`,
  )

  const CONCURRENCY = 6
  let completed = 0

  async function processRef(ref: string) {
    const asset = assets.get(ref)!
    const shortHash = crypto.createHash('sha1').update(ref).digest('hex').slice(0, 8)
    const ext = asset.extension || asset.mimeType?.split('/')[1]?.replace('jpeg', 'jpg') || 'bin'
    const baseName = (asset.originalFilename || ref)
      .replace(/\.[^.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 60)
    const filename = `${baseName}-${shortHash}.${ext}`
    const mimeType = asset.mimeType || 'application/octet-stream'

    let buffer: Buffer
    const cachePath = cacheDir ? path.join(cacheDir, filename) : null
    if (cachePath && fs.existsSync(cachePath)) {
      buffer = fs.readFileSync(cachePath)
    } else {
      const res = await fetch(asset.url)
      if (!res.ok) {
        console.warn(`Failed to download ${asset.url}: ${res.status}`)
        return
      }
      buffer = Buffer.from(await res.arrayBuffer())
      if (cachePath) {
        fs.writeFileSync(cachePath, buffer)
      }
    }

    const created = await payload.create({
      collection: 'media',
      data: {
        alt: asset.originalFilename || baseName,
        sanityAssetId: ref,
      },
      file: {
        data: buffer,
        mimetype: mimeType,
        name: filename,
        size: buffer.length,
      },
    })
    mediaIdByRef.set(ref, created.id)
    completed++
    if (completed % 25 === 0 || completed === toUpload.length) {
      console.log(`  Uploaded ${completed}/${toUpload.length} assets...`)
    }
  }

  const queue = [...toUpload]
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length > 0) {
      const ref = queue.shift()
      if (!ref) break
      await processRef(ref)
    }
  })
  await Promise.all(workers)

  return mediaIdByRef
}

async function main() {
  const docs = await loadNdjson()
  const cacheDir = getCacheDir()

  const assets = new Map<string, SanityImageAsset>()
  const activeTypes = new Set([
    'post',
    'member',
    'project',
    'course',
    'siteSection',
    'techStack',
  ])

  for (const doc of docs) {
    if (doc._type === 'sanity.imageAsset') {
      assets.set(doc._id, doc as SanityImageAsset)
    }
  }

  const referencedRefs = new Set<string>()
  const collectRefs = (val: unknown) => {
    if (!val || typeof val !== 'object') return
    if ('_ref' in val && typeof (val as { _ref: unknown })._ref === 'string') {
      const ref = (val as { _ref: string })._ref
      if (assets.has(ref)) referencedRefs.add(ref)
    }
    for (const child of Object.values(val)) {
      collectRefs(child)
    }
  }
  for (const doc of docs) {
    if (activeTypes.has(doc._type) && !doc._id.startsWith('drafts.')) {
      collectRefs(doc)
    }
  }

  const payload = await getPayload({ config })
  const mediaIdByRef = await migrateAssets(payload, assets, referencedRefs, cacheDir)

  const refToMediaId = (img: unknown): number | undefined => {
    const ref = (img as SanityImageRef | undefined)?.asset?._ref
    return ref ? mediaIdByRef.get(ref) : undefined
  }

  // 1. Members
  const members = docs.filter(
    (d) => d._type === 'member' && !d._id.startsWith('drafts.') && d.pekUsername,
  )
  const memberIdByUsername = new Map<string, number>()
  console.log(`Migrating ${members.length} members...`)
  for (const m of members) {
    const pekUsername = String(m.pekUsername)
    const rank =
      typeof m.rank === 'string' && VALID_RANKS.has(m.rank)
        ? (m.rank as
            | 'rookie'
            | 'member'
            | 'leader'
            | 'ex-leader'
            | 'hr-coord'
            | 'pr-coord'
            | 'deputy-leader'
            | 'financial-coord'
            | 'pek-admin'
            | 'courses-coord')
        : undefined
    const data = {
      pekUsername,
      firstName: String(m.firstName ?? ''),
      lastName: String(m.lastName ?? ''),
      rank,
      isActive: Boolean(m.isActive),
      mainImage: refToMediaId(m.mainImage),
      hoverImage: refToMediaId(m.hoverImage),
      darkImage: refToMediaId(m.darkImage),
      darkHoverImage: refToMediaId(m.darkHoverImage),
      sanityId: m._id,
    }
    const existing = await payload.find({
      collection: 'members',
      where: { pekUsername: { equals: pekUsername } },
      limit: 1,
    })
    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'members',
        id: existing.docs[0].id,
        data,
      })
      memberIdByUsername.set(pekUsername, updated.id)
    } else {
      const created = await payload.create({
        collection: 'members',
        data,
      })
      memberIdByUsername.set(pekUsername, created.id)
    }
  }

  // 2. Posts
  const posts = docs.filter(
    (d) =>
      d._type === 'post' &&
      !d._id.startsWith('drafts.') &&
      (d.slug as { current?: string } | undefined)?.current,
  )
  console.log(`Migrating ${posts.length} posts...`)
  for (const p of posts) {
    const slug = String((p.slug as { current: string }).current)
    const authorUsername =
      typeof p.author === 'string' && p.author.trim() ? p.author.trim() : undefined
    const authorMemberId = authorUsername
      ? memberIdByUsername.get(authorUsername)
      : undefined
    const publishedAt = String(p.publishedAt ?? p._createdAt ?? new Date().toISOString())
    const data = {
      title: String(p.title ?? slug),
      slug,
      publishedAt,
      excerpt: typeof p.excerpt === 'string' ? p.excerpt : undefined,
      author: authorMemberId,
      authorUsername,
      hashTag: typeof p.hashTag === 'string' ? p.hashTag : undefined,
      mainImage: refToMediaId(p.mainImage),
      hasToc: Boolean(p.hasToc),
      body: convertPortableTextToLexical(
        p.body as PortableTextBlock[] | undefined,
        mediaIdByRef,
      ) as never,
      sanityId: p._id,
    }
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'posts',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: 'posts',
        data,
      })
    }
  }

  // 3. Projects
  const projects = docs.filter(
    (d) =>
      d._type === 'project' &&
      !d._id.startsWith('drafts.') &&
      (d.slug as { current?: string } | undefined)?.current,
  )
  console.log(`Migrating ${projects.length} projects...`)
  for (const p of projects) {
    const slug = String((p.slug as { current: string }).current)
    const status =
      typeof p.status === 'string' && VALID_STATUSES.has(p.status)
        ? (p.status as 'active' | 'new' | 'done' | 'discontinued')
        : undefined
    const data = {
      title: String(p.title ?? slug),
      slug,
      status,
      priority: typeof p.priority === 'number' ? p.priority : 0,
      shortDesc: typeof p.shortDesc === 'string' ? p.shortDesc : undefined,
      githubRepos: Array.isArray(p.githubRepos)
        ? p.githubRepos
            .map((repo) => String(repo ?? '').trim())
            .filter(Boolean)
            .map((repo) => ({ repo }))
        : [],
      techStacks: Array.isArray(p.techStacks)
        ? p.techStacks
            .map((name) => String(name ?? '').trim())
            .filter(Boolean)
            .slice(0, 3)
            .map((name) => ({ name }))
        : [],
      homePageUrls: Array.isArray(p.homePageUrls)
        ? p.homePageUrls
            .map((url) => String(url ?? '').trim())
            .filter(Boolean)
            .map((url) => ({ url }))
        : [],
      mainImage: refToMediaId(p.mainImage),
      mobileMainImage: refToMediaId(p.mobileMainImage),
      isShownOnHomePage: Boolean(p.isShownOnHomePage),
      body: p.body
        ? (convertPortableTextToLexical(
            p.body as PortableTextBlock[],
            mediaIdByRef,
          ) as never)
        : undefined,
      sanityId: p._id,
    }
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: 'projects',
        data,
      })
    }
  }

  // 4. Courses
  const courses = docs.filter(
    (d) => d._type === 'course' && !d._id.startsWith('drafts.'),
  )
  console.log(`Migrating ${courses.length} courses...`)
  for (const c of courses) {
    const data = {
      title: String(c.title ?? 'Untitled Course'),
      isShown: c.isShown !== false,
      priority: typeof c.priority === 'number' ? c.priority : 0,
      body: c.body
        ? (convertPortableTextToLexical(
            c.body as PortableTextBlock[],
            mediaIdByRef,
          ) as never)
        : undefined,
      lecturers: Array.isArray(c.lecturers)
        ? c.lecturers
            .map((name) => String(name ?? '').trim())
            .filter(Boolean)
            .map((name) => ({ name }))
        : [],
      lectures: Array.isArray(c.lectures)
        ? c.lectures.map((l: Record<string, unknown>) => ({
            dateTimeInterval: l.dateTimeInterval
              ? String(l.dateTimeInterval)
              : undefined,
            place: l.place ? String(l.place) : undefined,
            description: l.description ? String(l.description) : undefined,
            getIconName: l.getIconName ? String(l.getIconName) : undefined,
          }))
        : [],
      sanityId: c._id,
    }
    const existing = await payload.find({
      collection: 'courses',
      where: { sanityId: { equals: c._id } },
      limit: 1,
    })
    if (existing.docs[0]) {
      await payload.update({
        collection: 'courses',
        id: existing.docs[0].id,
        data,
      })
    } else {
      await payload.create({
        collection: 'courses',
        data,
      })
    }
  }

  // 5. SiteSections (localized: hu & en grouped by key)
  const siteSections = docs.filter(
    (d) => d._type === 'siteSection' && !d._id.startsWith('drafts.') && d.key,
  )
  const sectionsByKey = new Map<string, Record<string, SanityDoc>>()
  for (const s of siteSections) {
    const key = String(s.key)
    const lang = s.language === 'en' ? 'en' : 'hu'
    const entry = sectionsByKey.get(key) ?? {}
    entry[lang] = s
    sectionsByKey.set(key, entry)
  }
  console.log(`Migrating ${sectionsByKey.size} site-sections (localized)...`)
  for (const [key, langs] of sectionsByKey.entries()) {
    const huDoc = langs.hu ?? langs.en
    const existing = await payload.find({
      collection: 'site-sections',
      where: { key: { equals: key } },
      limit: 1,
    })

    const huData = {
      key,
      isHidden: Boolean(huDoc.isHidden),
      body: convertPortableTextToLexical(
        huDoc.body as PortableTextBlock[] | undefined,
        mediaIdByRef,
      ) as never,
      contentUpdatedAt: huDoc._updatedAt ?? huDoc._createdAt,
    }

    let docId: number
    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'site-sections',
        id: existing.docs[0].id,
        locale: 'hu',
        data: huData,
      })
      docId = updated.id
    } else {
      const created = await payload.create({
        collection: 'site-sections',
        locale: 'hu',
        data: huData,
      })
      docId = created.id
    }

    if (langs.en) {
      await payload.update({
        collection: 'site-sections',
        id: docId,
        locale: 'en',
        data: {
          isHidden: Boolean(langs.en.isHidden),
          body: convertPortableTextToLexical(
            langs.en.body as PortableTextBlock[] | undefined,
            mediaIdByRef,
          ) as never,
          contentUpdatedAt: langs.en._updatedAt ?? langs.en._createdAt,
        },
      })
    }
  }

  // 6. TechStacks (localized: hu & en grouped by key)
  const techStacks = docs.filter(
    (d) => d._type === 'techStack' && !d._id.startsWith('drafts.') && d.key,
  )
  const stacksByKey = new Map<string, Record<string, SanityDoc>>()
  for (const s of techStacks) {
    const key = String(s.key)
    const lang = s.language === 'en' ? 'en' : 'hu'
    const entry = stacksByKey.get(key) ?? {}
    entry[lang] = s
    stacksByKey.set(key, entry)
  }
  console.log(`Migrating ${stacksByKey.size} tech-stacks (localized)...`)
  for (const [key, langs] of stacksByKey.entries()) {
    const huDoc = langs.hu ?? langs.en
    const existing = await payload.find({
      collection: 'tech-stacks',
      where: { key: { equals: key } },
      limit: 1,
    })

    const huData = {
      key,
      name: typeof huDoc.name === 'string' ? huDoc.name : key,
      priority: typeof huDoc.priority === 'number' ? huDoc.priority : 0,
      body: typeof huDoc.body === 'string' ? huDoc.body : '',
    }

    let docId: number
    if (existing.docs[0]) {
      const updated = await payload.update({
        collection: 'tech-stacks',
        id: existing.docs[0].id,
        locale: 'hu',
        data: huData,
      })
      docId = updated.id
    } else {
      const created = await payload.create({
        collection: 'tech-stacks',
        locale: 'hu',
        data: huData,
      })
      docId = created.id
    }

    if (langs.en) {
      await payload.update({
        collection: 'tech-stacks',
        id: docId,
        locale: 'en',
        data: {
          name: typeof langs.en.name === 'string' ? langs.en.name : key,
          body: typeof langs.en.body === 'string' ? langs.en.body : '',
        },
      })
    }
  }

  console.log('Sanity -> PayloadCMS migration completed successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
