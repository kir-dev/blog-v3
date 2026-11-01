import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { MeetingControls } from '~/components/members-components/MeetingControls'
import { MemberAvatarCard } from '~/components/members-components/MemberAvatarCard'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'

import { useTranslations } from 'next-intl'
import { NextSeo } from 'next-seo'
import { getMembers } from '~/lib/queries'
import { Member } from '~/lib/sanity.types'
import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sortedMembers: Member[]
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const members = await getMembers(client)
  const sortedMembers = [...members].sort((a, b) =>
    a.lastName.localeCompare(b.lastName),
  )

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sortedMembers,
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  }
}

export default function MembersPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const actives = props.sortedMembers.filter((m) => m.isActive)
  const inactives = props.sortedMembers.filter((m) => !m.isActive)
  const t = useTranslations('Members')

  return (
    <Layout>
      <NextSeo title={t('title')} />
      <Container>
        <h1 className="text-4xl font-extrabold tracking-tighter my-16">
          {t('title')}
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {actives.map((member) => (
            <div className="flex aspect-square" key={member.pekUsername}>
              <MemberAvatarCard member={member} />
            </div>
          ))}
        </div>
        <MeetingControls numberOfActives={actives.length} />
        {inactives.length > 0 && (
          <>
            <h1 className="text-3xl font-bold my-16">{t('inactivesTitle')}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {inactives.map((member) => (
                <div className="flex aspect-square" key={member.pekUsername}>
                  <MemberAvatarCard member={member} />
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}
