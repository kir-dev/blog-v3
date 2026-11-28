'use client'

import Autoscroll from 'embla-carousel-auto-scroll'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'
import ActionButton from '~/components/ActionButton'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/carousel/carousel'
import { GitHubSvg } from '~/components/svg-components/GitHubSvg'
import LaptopSuite from '~/components/svg/laptop-suite.svg'
import { Link } from '~/i18n/navigation'
import { getMediaUrl } from '~/lib/media'
import type { Project } from '~/payload-types'

export default function ProjectCarousel({ items }: { items?: Project[] }) {
  const t = useTranslations('Index')

  return (
    <Carousel
      className="max-sm:px-4 max-lg:px-12 my-4 w-full"
      opts={{
        loop: true,
        dragFree: false,
      }}
      plugins={[
        Autoscroll({
          startDelay: 0,
          speed: 1.5,
          stopOnFocusIn: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {items?.map((project) => {
          const desktopSrc = getMediaUrl(project.mainImage) ?? LaptopSuite
          const mobileSrc =
            getMediaUrl(project.mobileMainImage) ?? desktopSrc
          const firstRepo = project.githubRepos?.[0]?.repo

          return (
            <CarouselItem
              key={project.id}
              className="max-w-[17rem] sm:max-w-[65rem]"
            >
              <div className="relative w-full max-sm:aspect-[9/16] sm:aspect-[16/9] rounded-2xl cursor-pointer border-1 border-foreground/20 overflow-hidden">
                <Link
                  href={`/project/${project.slug}`}
                  className="block h-full w-full"
                >
                  <Image
                    alt={`Image for ${project.title}`}
                    className="max-sm:hidden h-full w-full object-cover rounded-2xl absolute left-0 top-0"
                    src={desktopSrc}
                    height={540}
                    width={960}
                    sizes="(max-width: 1040px) 100vw, 1040px"
                  />
                  <Image
                    alt={`Image for ${project.title}`}
                    className="sm:hidden h-full w-full object-cover rounded-2xl absolute left-0 top-0"
                    src={mobileSrc}
                    height={960}
                    width={540}
                    sizes="272px"
                  />
                </Link>
                <div className="absolute left-0 bottom-0 w-full bg-gradient-to-b from-transparent via-[#ffffff99] dark:via-[#00000099] via-35% sm:via-50% to-[#ffffffcc] dark:to-[#000000cc] p-4 sm:px-6 sm:pb-4 pt-24 sm:pt-16 rounded-b-2xl flex max-sm:flex-col justify-between sm:items-end pointer-events-none">
                  <div className="pointer-events-auto">
                    <h3 className="text-2xl sm:text-6xl font-extrabold leading-none tracking-tight">
                      <Link href={`/project/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    {firstRepo && (
                      <div className="flex gap-2 items-center mt-1">
                        <GitHubSvg className="w-4 h-4 fill-current" />
                        <a
                          className="hover:underline max-sm:text-xs max-sm:mt-1"
                          href={`https://github.com/${firstRepo}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {firstRepo}
                        </a>
                      </div>
                    )}
                    <p className="max-sm:text-sm max-sm:mt-4">
                      {project.shortDesc}
                    </p>
                  </div>
                  <div className="max-md:hidden pointer-events-auto">
                    <ActionButton href="/about/contact">
                      {t('projectsPromo.action')}
                    </ActionButton>
                  </div>
                </div>
              </div>
            </CarouselItem>
          )
        })}
      </CarouselContent>
    </Carousel>
  )
}
