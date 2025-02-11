import { Button, Chip } from '@nextui-org/react'
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
import type { SharedPageProps } from '~/pages/_app'
import { environment } from '~/utils/environment'

import { PortableText } from '@portabletext/react'
import { useTranslations } from 'next-intl'
import config from 'next-seo.config'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getLatestPost, getProjects, getSiteSection } from '~/lib/queries'
import { Member, Post, Project, SiteSection } from '~/lib/sanity.types'
import { commonSerializer } from '~/utils/serializers/common.serializer'
import LaptopSuite from '../components/svg/laptop-suite.svg'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/carousel/carousel'
import { urlForImage } from '~/lib/sanity.image'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    post?: Post
    author?: Member
    frontSections?: (SiteSection | undefined)[]
    frontAlert?: SiteSection
    highlightedProjects?: Project[]
  }
> = async ({ draftMode = false, locale }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const { post, author } = await getLatestPost(client)
  const frontSections = [
    await getSiteSection(client, 'frontpage1', locale),
    await getSiteSection(client, 'frontpage2', locale),
  ]
  const frontAlert = await getSiteSection(client, 'frontAlert', locale)
  const highlightedProjects = await getProjects(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      post,
      author,
      frontSections,
      frontAlert,
      highlightedProjects,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const { post, author, frontSections, frontAlert, highlightedProjects } = props
  const client = getClient()
  const [alertShown, setAlertShown] = useState(false)
  const closeAlert = () => {
    localStorage.setItem(
      'lastIgnoredAlertUpdatedAt',
      frontAlert?._updatedAt ?? '',
    )
    setAlertShown(false)
  }
  useEffect(() => {
    frontAlert?.isHidden
      ? setAlertShown(false)
      : localStorage.getItem('lastIgnoredAlertUpdatedAt') ===
          frontAlert?._updatedAt
        ? setAlertShown(false)
        : setAlertShown(true)
  }, [frontAlert])
  const router = useRouter()
  const t = useTranslations('Index')

  return (
    <Layout>
      <section className="flex flex-col items-center h-[90vh] sm:h-[96vh] justify-center px-6 sm:px-0 pb-8">
        {alertShown && (
          <Chip
            onClose={closeAlert}
            variant="solid"
            color="primary"
            classNames={{ base: 'absolute top-16 sm:top-20 z-50' }}
          >
            <PortableText
              value={frontAlert?.body ?? []}
              components={{
                ...commonSerializer,
                marks: {
                  link: ({ value, children }) => {
                    const url = new URL(value?.href)
                    const isInternal = value?.href?.startsWith(config.canonical)
                    return (
                      <Link
                        href={
                          isInternal
                            ? `${url.pathname}${url.hash}`
                            : value?.href
                        }
                        className="underline"
                      >
                        {children}
                      </Link>
                    )
                  },
                },
              }}
            />
          </Chip>
        )}
        <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight">
          {t('mainTitle')}
        </h1>
        <Terminal />
        <div className="flex flex-row gap-4 mt-6">
          <Button color="primary" onClick={() => router.push('/about/contact')}>
            {t('joinUs')}
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
      <section className="w-full flex justify-center">
        <Carousel className="py-8 h-96">
          <CarouselContent className="bg-red-500">
            {highlightedProjects &&
              highlightedProjects.map((project, index) => (
                <CarouselItem
                  key={project._id}
                  className={`border-2 border-white rounded-2xl cursor-pointer h-96 w-min`}
                >
                  <Image
                    alt={`Image for ${project.title}`}
                    className={`z-0 h-full w-auto object-contain rounded-lg bg-green-200`}
                    src={
                      project.mainImage
                        ? (urlForImage(project.mainImage)
                            ?.width(1920)
                            .height(1080)
                            .url() ?? LaptopSuite)
                        : LaptopSuite
                    }
                    height={540}
                    width={1280}
                    onClick={() =>
                      router.push(`/project/${project.slug.current}`)
                    }
                  />
                  <div className="absolute bottom-0 bg-gradient-to-b from-transparent to-black z-10 p-8 rounded-2xl">
                    <h1 className="text-4xl font-extrabold leading-none tracking-tight">
                      {project.title}
                    </h1>
                    <ActionButton href={`/projects/${project.slug}`}>
                      Fejleszteni akarok!
                    </ActionButton>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="w-full flex justify-center">
        <Carousel className="py-8 h-96 w-full max-w-5xl">
          <CarouselContent className="flex justify-center items-center bg-red-500 space-x-4">
            {highlightedProjects &&
              highlightedProjects.map((project) => (
                <CarouselItem
                  key={project._id}
                  className="border-2 border-white rounded-2xl cursor-pointer h-96 w-auto flex justify-center items-center"
                >
                  <div className="relative h-full w-[calc(100%*16/9)]">
                    <Image
                      alt={`Image for ${project.title}`}
                      className="h-full w-auto max-h-full object-contain rounded-lg bg-green-200"
                      src={
                        project.mainImage
                          ? (urlForImage(project.mainImage)
                              ?.width(1920)
                              .height(1080)
                              .url() ?? LaptopSuite)
                          : LaptopSuite
                      }
                      height={540}
                      width={960}
                      onClick={() =>
                        router.push(`/project/${project.slug.current}`)
                      }
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black p-4 rounded-b-2xl">
                      <h1 className="text-2xl font-extrabold leading-none tracking-tight text-white">
                        {project.title}
                      </h1>
                      <ActionButton href={`/projects/${project.slug}`}>
                        Fejleszteni akarok!
                      </ActionButton>
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </section>
      <section className="bg-gradient-to-r from-foreground-50 to-foreground-200 border-gray-300 border-y-1 py-24">
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
      {post && (
        <section className="py-24">
          <Container>
            <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
              {t('blogPromo.title')}
            </h2>
            <hr className="mb-16" />
            <PostPreviewFrontpage post={post} author={author} />
          </Container>
        </section>
      )}
      <section className="py-24">
        <Container>
          <h2 className="mb-8 text-3xl font-extrabold leading-none tracking-tight">
            {t('operations.title')}
          </h2>
          <hr className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {frontSections?.map((section) =>
              section ? (
                <div key={section._id}>
                  <PortableText
                    value={section?.body}
                    components={commonSerializer}
                  />
                </div>
              ) : null,
            )}
          </div>
        </Container>
      </section>
    </Layout>
  )
}
