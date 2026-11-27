import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { MeetingControls } from '~/components/members-components/MeetingControls'
import { MemberAvatarCard } from '~/components/members-components/MemberAvatarCard'
import { getMembers } from '~/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Members' })
  return { title: t('title') }
}

export default async function MembersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Members')
  const members = await getMembers()

  const actives = members.filter((m) => m.isActive)
  const inactives = members.filter((m) => !m.isActive)

  return (
    <Layout>
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
            <h2 className="text-3xl font-bold my-16">{t('inactivesTitle')}</h2>
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
