import { postgresAdapter } from '@payloadcms/db-postgres'
import { s3Storage } from '@payloadcms/storage-s3'
import { en } from '@payloadcms/translations/languages/en'
import { hu } from '@payloadcms/translations/languages/hu'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Courses } from './collections/Courses'
import { Media } from './collections/Media'
import { Members } from './collections/Members'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { SiteSections } from './collections/SiteSections'
import { TechStacks } from './collections/TechStacks'
import { Users } from './collections/Users'
import { blogLexicalEditor } from './lib/lexical'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const useS3 = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

export default buildConfig({
  i18n: {
    supportedLanguages: { en, hu },
    fallbackLanguage: 'hu',
  },
  localization: {
    locales: [
      { label: 'Magyar', code: 'hu' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'hu',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Kir-Dev CMS',
    },
  },
  collections: [
    Users,
    Media,
    Posts,
    Projects,
    Members,
    Courses,
    SiteSections,
    TechStacks,
  ],
  editor: blogLexicalEditor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString:
        process.env.DATABASE_URI ?? process.env.DATABASE_URL ?? '',
    },
    migrationDir: './src/migrations',
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [
    ...(useS3
      ? [
          s3Storage({
            collections: {
              media: true,
            },
            bucket: process.env.S3_BUCKET!,
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
              },
              forcePathStyle: true,
              region: process.env.S3_REGION || 'us-east-1',
              endpoint: process.env.S3_ENDPOINT!,
            },
          }),
        ]
      : []),
  ],
})
