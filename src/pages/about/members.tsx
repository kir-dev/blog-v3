import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { MeetingControls } from '~/components/members-components/MeetingControls'
import { MemberAvatarCard } from '~/components/members-components/MemberAvatarCard'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getMembers, Member } from '~/lib/sanity.queries'

import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    members: Member[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const members = await getMembers(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      members,
    },
  }
}

export default function MembersPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const actives = props.members?.filter((m) => m.isActive)
  const inactives = props.members?.filter((m) => !m.isActive)

  return (
    <Layout>
      <Container>
        <h1 className="text-4xl font-extrabold tracking-tighter my-16">
          Tagjaink
        </h1>
        <div className="flex flex-col">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {actives
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((member) => (
                <div className="flex" key={member.pekUsername}>
                  <MemberAvatarCard member={member} />
                </div>
              ))}
          </div>
          <MeetingControls numberOfActives={actives?.length} />
        </div>
        {inactives?.length && (
          <>
            <h1 className="text-3xl font-bold my-16">Korábbi tagjaink</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {inactives
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((member) => (
                  <div className="flex" key={member.pekUsername}>
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
