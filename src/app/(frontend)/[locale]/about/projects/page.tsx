import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import ProjectPreview from '~/components/project-components/ProjectPreview'
import { getProjects } from '~/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Projects' })
  return { title: t('title') }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Projects')
  const projects = await getProjects()

  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-bold my-16">{t('title')}</h1>
        <hr className="my-8 border-foreground/20" />
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {projects.map((project) => (
            <ProjectPreview key={project.id} project={project} />
          ))}
        </section>
      </Container>
    </Layout>
  )
}
