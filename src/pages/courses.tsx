import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { TechsLogo } from '~/components/svg-components/TechsLogo'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { commonSerializer } from '~/utils/serializers/common.serializer'

import { useTranslations } from 'next-intl'
import { NextSeo } from 'next-seo'
import CoursePreview from '~/components/courses-components/CoursePreview'
import { getCourses, getSiteSection } from '~/lib/queries'
import { Course, SiteSection } from '~/lib/sanity.types'
import { SharedPageProps } from './_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionCourseList?: SiteSection
    sectionMentoring?: SiteSection
    sectionJoining?: SiteSection
    courses: Course[]
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionCourseList = await getSiteSection(client, 'courseList')
  const sectionJoining = await getSiteSection(client, 'joining')
  const sectionMentoring = await getSiteSection(client, 'mentoring')
  const courses = await getCourses(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionCourseList,
      sectionMentoring,
      sectionJoining,
      courses,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function CoursesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionCourseList, sectionJoining, sectionMentoring, courses } = props
  const t = useTranslations('Courses')

  return (
    <Layout>
      <NextSeo title={t('title')} />
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
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container>
          <PortableText
            value={sectionCourseList?.body ?? []}
            components={commonSerializer}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 mt-8">
            {courses
              ?.filter((course) => course.isShown)
              .sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
              .reverse()
              .map((course) => (
                <CoursePreview key={course._id} course={course} />
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
            <hr className="my-8" />
            <PortableText
              value={sectionJoining?.body ?? []}
              components={commonSerializer}
            />
          </div>
          <div className="my-8 mt-24">
            <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
              {t('sectionMentoringTitle')}
            </h2>
            <hr className="my-8" />
            <PortableText
              value={sectionMentoring?.body ?? []}
              components={commonSerializer}
            />
          </div>
        </Container>
      </section>
    </Layout>
  )
}
