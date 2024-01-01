import { Button, Link as UiLink } from '@nextui-org/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'

import ActionButton from '~/components/ActionButton'
import Container from '~/components/Container'
import Layout from '~/components/Layout'
import PostPreviewFrontpage from '~/components/post-components/PostPreviewFrontpage'
import { GitHubSvg } from '~/components/svg-components/GitHubSvg'
import { Terminal } from '~/components/terminal/Terminal'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getLatestPost, getPosts, type Post } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { environment } from '~/utils/environment'

import LaptopSuite from '../components/svg/laptop-suite.svg'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post: Post
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getLatestPost(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const post = props.post
  const router = useRouter()

  return (
    <Layout>
      <section className="flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight">
          A kollégium webfejlesztői.
        </h1>
        <Terminal />
        <div className="flex flex-row gap-4 mt-6">
          <Button color="primary" onClick={() => router.push('/about/contact')}>
            Csatlakozás
          </Button>
          <Button
            as="a"
            href={environment.socials.githubOrgUrl}
            variant="bordered"
            startContent={<GitHubSvg className="h-3 w-3 fill-current" />}
          >
            GitHub
          </Button>
        </div>
      </section>
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
        <Container id="about-us-in-short" className="relative">
          <div className="max-w-3xl sm:h-96">
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              A Kir-Dev küldetése a Schönherz lakói számára hasznos webappok
              készítése.
            </h2>
            <p>
              Webfejlesztés mellett a mobilfejlesztés és az üzemeltetési
              technológiák terén is képezzük magunkat. Tavasszal tanfolyamokat
              hirdetünk, amelyek segítik a körbe való csatlakozást.
            </p>
            <ActionButton href="/about/history" className="mt-8">
              Tudj meg rólunk többet
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
          <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
            Legutóbbi bejegyzés blogunkból
          </h2>
          <hr className="mb-16" />
          <PostPreviewFrontpage post={post} />
        </Container>
      </section>
      <section className="py-24">
        <Container>
          <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
            Működésünk
          </h2>
          <hr />
          <p className="mt-8">
            Rendszereinket a{' '}
            <UiLink href="https://kszk.bme.hu" target="_blank">
              KSZK
            </UiLink>{' '}
            Kubernetes és VMware szolgáltatásainak segítségévél hosztoljuk. A
            szolgáltatásainkat Better Uptime megoldásaival monitorozzuk,
            amelynek hála azonnal értesülünk az esetleges leállásokról. A
            rendelkezésre állást a linkre kattintva ellenőrizheted.
          </p>
          <ActionButton
            href={environment.statusKirDevUrl}
            newTab
            className="mt-8"
          >
            Szolgáltatások státusza
          </ActionButton>
          <p className="mt-16">
            Kiemelt feladatunk a{' '}
            <span className="px-1 pb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-400 font-bold">
              Profil és Körök
            </span>{' '}
            webapp folyamatos fejlesztése és karbantartása. Ez a rendszer már
            több generációt is megélt az aktív körtagoknak köszönhetően.
            Jelenleg ezen az alkalmazáson keresztül folyik a kar közösségi
            pontozása.
          </p>
          <ActionButton href="/project/pek-next" className="mt-8">
            Több a PéK projektről
          </ActionButton>
        </Container>
      </section>
    </Layout>
  )
}
