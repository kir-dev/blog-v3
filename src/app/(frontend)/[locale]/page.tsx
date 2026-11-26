import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import ActionButton from '~/components/ActionButton'
import ProjectCarousel from '~/components/carousel/ProjectCarousel'
import Container from '~/components/Container'
import { FrontAlertBanner } from '~/components/FrontAlertBanner'
import Layout from '~/components/Layout'
import PostPreviewFrontpage from '~/components/post-components/PostPreviewFrontpage'
import { RichText } from '~/components/RichText'
import { GitHubSvg } from '~/components/svg-components/GitHubSvg'
import LaptopSuite from '~/components/svg/laptop-suite.svg'
import { Terminal } from '~/components/terminal/Terminal'
import { Link } from '~/i18n/navigation'
import {
  getHomescreenProjects,
  getLatestPost,
  getSiteSection,
} from '~/lib/payload'
import { environment } from '~/utils/environment'

export const dynamic = 'force-dynamic'

export default async function IndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Index')

  const [latest, frontpage1, frontpage2, frontAlert, highlightedProjects] =
    await Promise.all([
      getLatestPost(),
      getSiteSection('frontpage1', locale),
      getSiteSection('frontpage2', locale),
      getSiteSection('frontAlert', locale),
      getHomescreenProjects(),
    ])

  const frontSections = [frontpage1, frontpage2].filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  )

  return (
    <Layout>
      <section className="relative flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        <FrontAlertBanner frontAlert={frontAlert} />
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-center">
          {t('mainTitle')}
        </h1>
        <Terminal />
        <div className="flex flex-row flex-wrap justify-center gap-4 mt-6">
          <a
            href={environment.coursesSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-default px-4 h-10 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            {environment.coursesSiteUrl.replace(/^https?:\/\//i, '')}
          </a>
          <Link
            href="/about/contact"
            className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground px-4 h-10 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t('joinUs')}
          </Link>
          <a
            href={environment.socials.githubOrgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-default px-4 h-10 text-sm font-medium hover:opacity-80 transition-opacity"
          >
            <GitHubSvg className="h-3 w-3 fill-current" />
            GitHub portfolio
          </a>
        </div>
      </section>

      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 dark:border-foreground-200 border-y-1 py-24">
        <Container id="about-us-in-short" className="relative">
          <div className="max-w-3xl sm:h-96">
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              {t('mission.title')}
            </h2>
            <p>{t('mission.body')}</p>
            <ActionButton href="/about/history" className="mt-8">
              {t('mission.action')}
            </ActionButton>
          </div>
          <div className="absolute right-0 bottom-0 h-0 sm:h-48 lg:h-72 xl:h-96 pr-10">
            <Image
              src={LaptopSuite}
              height={500}
              width={500}
              alt="Laptop illustration"
              className="h-full w-auto"
            />
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="max-w-3xl">
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              {t('projectsPromo.title')}
            </h2>
          </div>
        </Container>
        <ProjectCarousel items={highlightedProjects} />
      </section>

      {latest && (
        <section className="py-24">
          <Container>
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              {t('blogPromo.title')}
            </h2>
            <hr className="mb-16 border-foreground/20" />
            <PostPreviewFrontpage post={latest.post} author={latest.author} />
          </Container>
        </section>
      )}

      <section className="py-24">
        <Container>
          <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
            {t('operations.title')}
          </h2>
          <hr className="mb-8 border-foreground/20" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {frontSections.map((section) => (
              <div key={section.id}>
                <RichText data={section.body} variant="common" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  )
}
