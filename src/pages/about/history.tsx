import { PortableText } from '@portabletext/react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import {
  getSiteSection,
  getTechStacks,
  SiteSection,
  TechStack,
} from '~/lib/sanity.queries'
import { aboutPageComponents } from '~/utils/portable-text-comps'
import { getStackSvg } from '~/utils/tech-stack'

import { SharedPageProps } from '../_app'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    sectionHistory?: SiteSection
    sectionTeamwork?: SiteSection
    techStacks?: TechStack[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const sectionHistory = await getSiteSection(client, 'history')
  const sectionTeamwork = await getSiteSection(client, 'teamwork')
  const techStacks = await getTechStacks(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      sectionHistory,
      sectionTeamwork,
      techStacks,
    },
  }
}

export default function HistoryPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { sectionHistory, sectionTeamwork, techStacks } = props

  return (
    <Layout>
      <Container>
        <section className="my-8">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            Történelem
          </h2>
          <hr className="my-8" />
          <PortableText
            value={sectionHistory?.body}
            components={aboutPageComponents}
          />
        </section>
        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            Technológiák
          </h2>
          <hr className="my-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStacks
              ?.sort((a, b) => a.priority - b.priority)
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
          <ActionButton href="/about/projects" className="mt-8">
            Ismerd meg munkáink
          </ActionButton>
          <h3 className="text-2xl font-bold mt-16">Üzemeltetés</h3>
          <p className="mt-8">
            Szerveralkalmazásaink a Kollégiumi Számítástechnikai Kör által
            szolgáltatott VMWare virtuális gépünkre, illetve a fenntartott
            Kubernetes klaszterbe telepítjük. Nagy figyelmet szentelünk a
            megfelelő DevOps folyamatok, automatizációk kialakítására, ebben
            támogat minket a Better Stack is. Kiemelt támogatónk a Vercel,
            amelynek köszönhetően a Next.js projekteket és egyéb frontend-heavy
            alkalmazásaink könnyedén élesíthetjük.
          </p>
        </section>
        <section className="my-8 mt-24">
          <h2 className="text-4xl font-extrabold leading-none tracking-tight mt-16">
            Csapatmunka
          </h2>
          <hr className="my-8" />
          <PortableText
            value={sectionTeamwork?.body}
            components={aboutPageComponents}
          />
        </section>
        <div className="mt-12 flex flex-col items-start gap-4"></div>
      </Container>
    </Layout>
  )
}
