import { ArrowDownIcon } from '@heroicons/react/24/solid'
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import CoursePreview from '~/components/courses-components/CoursePreview'
import Layout from '~/components/Layout'
import { RichText } from '~/components/RichText'
import { TechsLogo } from '~/components/svg-components/TechsLogo'
import { getCourses, getSiteSection } from '~/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Courses' })
  return { title: t('title') }
}

export default async function CoursesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Courses')

  const [sectionCourseList, sectionJoining, sectionMentoring, courses] =
    await Promise.all([
      getSiteSection('courseList', locale),
      getSiteSection('joining', locale),
      getSiteSection('mentoring', locale),
      getCourses(),
    ])

  return (
    <Layout>
      <section className="flex flex-col items-center md:h-[96vh] justify-center">
        <Container useCustom>
          <div className="flex flex-col lg:flex-row my-16 mb-24 md:my-0 gap-24 md:pb-16">
            <div className="flex-1">
              <h1 className="text-4xl font-extrabold leading-none tracking-tight mb-6">
                {t('title')}
              </h1>
              <p>{t('body')}</p>
              <ActionButton
                href="#join"
                className="mt-8"
                icon={<ArrowDownIcon className="h-4 w-4" />}
              >
                {t('action')}
              </ActionButton>
            </div>
            <div className="flex-1 flex justify-end">
              <TechsLogo className="w-[30rem] lg:w-full" />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 dark:border-foreground-200 border-y-1 py-24">
        <Container>
          <RichText data={sectionCourseList?.body} variant="common" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-8">
            {courses.map((course) => (
              <CoursePreview key={course.id} course={course} />
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container useCustom>
          <div className="my-8 mt-24">
            <a id="join" className="top-[-100px] block relative invisible" />
            <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
              {t('sectionJoiningTitle')}
            </h2>
            <hr className="my-8 border-foreground/20" />
            <RichText data={sectionJoining?.body} variant="common" />
          </div>
          <div className="my-8 mt-24">
            <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
              {t('sectionMentoringTitle')}
            </h2>
            <hr className="my-8 border-foreground/20" />
            <RichText data={sectionMentoring?.body} variant="common" />
          </div>
        </Container>
      </section>
    </Layout>
  )
}
