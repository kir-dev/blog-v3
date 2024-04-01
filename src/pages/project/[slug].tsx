import { LinkIcon } from '@heroicons/react/24/solid'
import { Badge, Chip } from '@nextui-org/react'
import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'
import { NextSeo } from 'next-seo'
import config from 'next-seo.config'
import Image from 'next/image'
import Container from '~/components/Container'

import Layout from '~/components/Layout'
import { GitHubSvg } from '~/components/svg-components/GitHubSvg'
import {
  getProject,
  projectBySlugQuery,
  projectSlugsQuery,
} from '~/lib/queries'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { Project } from '~/lib/sanity.types'
import type { SharedPageProps } from '~/pages/_app'
import { projectStatusMapping } from '~/utils/project-status'
import { postContentSerializer } from '~/utils/serializers/post-content.serializer'

interface Query {
  [key: string]: string
}

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    project: Project
  },
  Query
> = async ({ draftMode = false, params = {} }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const project = await getProject(client, params.slug)

  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      project,
    },
  }
}

export default function ProjectSlugRoute(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [project] = useLiveQuery(props.project, projectBySlugQuery, {
    slug: props.project.slug.current,
  })

  return (
    <Layout>
      <NextSeo
        title={project.title}
        description={project.shortDesc ?? config.description}
        openGraph={{
          images: [
            {
              url:
                urlForImage(project.mainImage)?.url() ??
                config.openGraph.images[0].url,
            },
          ],
          type: 'article',
          title: project.title,
          description: project.shortDesc ?? config.openGraph.description,
          article: {
            publishedTime: project._createdAt,
            modifiedTime: project._updatedAt,
            authors: [`kir-dev`],
            tags: [
              'webdev',
              'engineering',
              'programming',
              ...project.techStacks.map((s) => s.toLowerCase()),
            ],
          },
        }}
      />
      <Container
        useCustom
        className="mb-16"
        style={{ wordBreak: 'break-word' }}
      >
        {project.mainImage ? (
          <Image
            src={urlForImage(project.mainImage)?.url()}
            height={500}
            width={1000}
            className="object-cover rounded-md w-full h-[50vh]"
            alt=""
          />
        ) : (
          <div className="mt-16" />
        )}
        <div className="flex flex-row flex-wrap justify-between gap-4 mt-8 mb-4">
          <div>
            <Badge
              content={
                projectStatusMapping.find((p) => p.value === project.status)
                  .title
              }
              color={
                project.status === 'discontinued'
                  ? 'danger'
                  : project.status === 'new'
                    ? 'secondary'
                    : 'success'
              }
            >
              <h1 className="text-4xl tracking-tighter font-extrabold">
                {project.title}&nbsp;&nbsp;
              </h1>
            </Badge>
            <div className="flex items-center gap-2 mt-2">
              {project.techStacks.map((techStack, index) => (
                <Chip key={`${techStack}-${index}`} size="sm">
                  {techStack}
                </Chip>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-row justify-end whitespace-nowrap">
            <div className="text-small text-foreground-500 text-end flex flex-col gap-1">
              {project.githubRepos?.map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-end gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
                >
                  <GitHubSvg className="w-4 h-4 fill-current" />
                  <a
                    className="hover:underline"
                    href={`https://github.com/${p}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {p}
                  </a>
                </div>
              ))}
              {project.homePageUrls?.map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-end gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
                >
                  <LinkIcon className="w-4 h-4 fill-current" />
                  <a
                    className="hover:underline"
                    href={p}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {p}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-16 break-words">
          <PortableText
            value={project.body}
            components={postContentSerializer}
          />
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  const slugs = await client.fetch(projectSlugsQuery)

  return {
    paths: slugs?.map(({ slug }) => `/project/${slug}`) || [],
    fallback: 'blocking',
  }
}
