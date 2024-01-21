import { ArrowDownIcon } from '@heroicons/react/24/solid'
import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { TechsLogo } from '~/components/svg-components/TechsLogo'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { Course, getCourses, getSiteSection,SiteSection } from '~/lib/sanity.queries'
import { aboutPageComponents } from '~/utils/portable-text-comps'

import { SharedPageProps } from './_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionMentoring?: SiteSection
    sectionJoining?: SiteSection
    courses: Course[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionJoining = await getSiteSection(client, 'joining')
  const sectionMentoring = await getSiteSection(client, 'mentoring')
  const courses = await getCourses(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionMentoring,
      sectionJoining,
      courses
    },
  }
}

export default function CoursesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionJoining, sectionMentoring, courses } = props

  return (
    <Layout>
      <Container>
        <div className="flex flex-col md:flex-row my-16 gap-8">
          <div>
            <h1 className="text-4xl font-extrabold leading-none tracking-tight mb-6">
              Tanfolyamunk
            </h1>
            <p>
              A tavaszi félévek folyamán több alkalmas tanfolyamsorozatot
              tartunk. Megismerkedhettek a HTML-JS-CSS világával, egy-egy webes
              keretrendszerrel, illetve a webfejlesztés szakkifejezéseivel,
              eszközeivel.
            </p>
            <ActionButton href="#join" className="mt-8" icon={<ArrowDownIcon className="h-4 w-4" />}>
              Jelentkezés lentebb
            </ActionButton>
          </div>
          <div className="flex justify-end">
            <TechsLogo className="w-[24rem]" />
          </div>
        </div>
      </Container>
      <Container>
        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
          Jelentkezés
          </h2>
          <hr className="my-8" />
          <PortableText
            value={sectionJoining?.body}
            components={aboutPageComponents}
          />
          <a id="join" />
        </section>
      </Container>
      <Container>
        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            Mentorprogram
          </h2>
          <hr className="my-8" />
          <PortableText
            value={sectionMentoring?.body}
            components={aboutPageComponents}
          />
        </section>
      </Container>
    </Layout>
  )
}
