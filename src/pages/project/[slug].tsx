import { Chip } from '@nextui-org/react'
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
import { postPageComponents } from '~/utils/portable-text-comps'

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
      <Container useCustom>
        {project.mainImage ? (
          <Image
            src={urlForImage(project.mainImage).url()}
            height={231}
            width={367}
            alt=""
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="">
          <h1 className="text-4xl tracking-tighter font-extrabold my-16">
            {project.title}
          </h1>
          <p className="">{project.shortDesc}</p>
          <div className="flex items-center gap-2 mt-2">
            {project.techStacks.map((techStack, index) => (
              <Chip key={`${techStack}-${index}`} size="sm">
                {techStack}
              </Chip>
            ))}
          </div>
          {project.githubRepos.map((p) => (
            <div
              key={p}
              className="flex items-center gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
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
          <div className="mt-16">
            <PortableText
              value={project.body}
              components={postPageComponents}
            />
          </div>
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
