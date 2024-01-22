import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import ProjectPreview from '~/components/project-components/ProjectPreview'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getProjects, Project } from '~/lib/sanity.queries'

import { NextSeo } from 'next-seo'
import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    projects: Project[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const projects = await getProjects(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      projects,
    },
  }
}

export default function ProjectsPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { projects } = props

  return (
    <Layout>
      <NextSeo title="Projektjeink" />
      <Container>
        <h1 className="text-4xl font-bold my-16">Projektjeink</h1>
        <hr className="my-8" />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects
            .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
            .reverse()
            .map((project) => (
              <ProjectPreview key={project._id} project={project} />
            ))}
        </section>
      </Container>
    </Layout>
  )
}
