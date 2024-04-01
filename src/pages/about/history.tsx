import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { commonSerializer } from '~/utils/serializers/common.serializer'
import { getStackSvg } from '~/utils/tech-stack'

import { useTranslations } from 'next-intl'
import { NextSeo } from 'next-seo'
import { getSiteSection, getTechStacks } from '~/lib/queries'
import { SiteSection, TechStack } from '~/lib/sanity.types'
import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionHistory?: SiteSection
    sectionTeamwork?: SiteSection
    sectionTechStack?: SiteSection
    techStacks?: TechStack[]
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionHistory = await getSiteSection(client, 'history')
  const sectionTechStack = await getSiteSection(client, 'techstack')
  const sectionTeamwork = await getSiteSection(client, 'teamwork')
  const techStacks = await getTechStacks(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionHistory,
      sectionTeamwork,
      sectionTechStack,
      techStacks,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  }
}

export default function HistoryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionHistory, sectionTeamwork, sectionTechStack, techStacks } =
    props
  const t = useTranslations('History')

  return (
    <Layout>
      <NextSeo title={t('title')} />
      <Container useCustom>
        <section className="my-8">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            {t('sectionHistory.title')}
          </h2>
          <hr className="my-8" />
          <PortableText
            value={sectionHistory?.body ?? []}
            components={commonSerializer}
          />
        </section>
        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            {t('sectionTechStack.title')}
          </h2>
          <hr className="my-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStacks
              ?.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
              .map((item) => (
                <article
                  key={item.key}
                  className="flex flex-col gap-2 border-foreground-500 border-1 rounded-lg p-8"
                >
                  <div>{getStackSvg(item.key)}</div>
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-foreground-500">{item.body}</p>
                </article>
              ))}
          </div>
          <ActionButton href="/about/projects" className="mt-8 mb-4">
            {t('sectionTechStack.action')}
          </ActionButton>
          <PortableText
            value={sectionTechStack?.body ?? []}
            components={commonSerializer}
          />
        </section>
        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            {t('sectionTeamwork.title')}
          </h2>
          <hr className="my-8" />
          <PortableText
            value={sectionTeamwork?.body ?? []}
            components={commonSerializer}
          />
        </section>
      </Container>
    </Layout>
  )
}
