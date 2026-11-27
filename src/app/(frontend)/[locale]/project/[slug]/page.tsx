import { LinkIcon } from '@heroicons/react/24/solid'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { GitHubSvg } from '~/components/svg-components/GitHubSvg'
import { Badge } from '~/components/ui/Badge'
import { Chip } from '~/components/ui/Chip'
import { getMediaUrl } from '~/lib/media'
import { getProjectBySlug } from '~/lib/payload'
import { siteConfig } from '~/lib/site-config'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(decodeURIComponent(slug))
  if (!project) return {}

  const imageUrl = getMediaUrl(project.mainImage) ?? siteConfig.defaultOgImage

  return {
    title: project.title,
    description: project.shortDesc ?? siteConfig.description,
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.shortDesc ?? siteConfig.shortDescription,
      images: [{ url: imageUrl }],
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
      authors: ['kir-dev'],
      tags: [
        'webdev',
        'engineering',
        'programming',
        ...(project.techStacks?.map((s) => s.name.toLowerCase()) ?? []),
      ],
    },
  }
}

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const project = await getProjectBySlug(decodeURIComponent(slug))
  if (!project) notFound()

  const t = await getTranslations()
  const mainImageUrl = getMediaUrl(project.mainImage)
  const statusLabel = project.status
    ? t(`Projects.status.${project.status}`)
    : undefined

  return (
    <Layout>
      <Container
        useCustom
        className="mb-16"
        style={{ wordBreak: 'break-word' }}
      >
        {mainImageUrl ? (
          <Image
            src={mainImageUrl}
            height={500}
            width={1000}
            className="object-cover rounded-md w-full h-[50vh] mt-4"
            alt={project.title}
          />
        ) : (
          <div className="mt-16" />
        )}
        <div className="flex flex-row flex-wrap justify-between gap-4 mt-8 mb-4">
          <div>
            <Badge
              content={statusLabel}
              color={
                project.status === 'discontinued'
                  ? 'danger'
                  : project.status === 'new'
                    ? 'secondary'
                    : 'success'
              }
            >
              <h1 className="text-4xl tracking-tighter font-extrabold pr-6">
                {project.title}
              </h1>
            </Badge>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {project.techStacks?.map((techStack, index) => (
                <Chip key={`${techStack.name}-${index}`} size="sm">
                  {techStack.name}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-end whitespace-nowrap">
            <div className="text-small text-foreground-500 text-end flex flex-col gap-1">
              {project.githubRepos?.map((item) => (
                <div
                  key={item.repo}
                  className="flex items-center justify-end gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
                >
                  <GitHubSvg className="w-4 h-4 fill-current" />
                  <a
                    className="hover:underline"
                    href={`https://github.com/${item.repo}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.repo}
                  </a>
                </div>
              ))}
              {project.homePageUrls?.map((item) => (
                <div
                  key={item.url}
                  className="flex items-center justify-end gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
                >
                  <LinkIcon className="w-4 h-4 fill-current" />
                  <a
                    className="hover:underline"
                    href={item.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 break-words">
          <RichText data={project.body} variant="post" />
        </div>
      </Container>
    </Layout>
  )
}
