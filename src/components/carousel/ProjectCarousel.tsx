'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '~/components/carousel/carousel'
import Image from 'next/image'
import Autoscroll from 'embla-carousel-auto-scroll'
import { urlForImage } from '~/lib/sanity.image'
import LaptopSuite from '~/components/svg/laptop-suite.svg'
import ActionButton from '~/components/ActionButton'
import { Project } from '~/lib/sanity.types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { GitHubSvg } from '~/components/svg-components/GitHubSvg'
import { LinkIcon } from '@heroicons/react/24/solid'

export default function ProjectCarousel({ items }: { items?: Project[] }) {
  const t = useTranslations('Index')
  return (
    <Carousel
      className="max-sm:px-4 max-lg:px-12 my-8 w-full"
      opts={
        {
          loop: true,
          dragFree: false,

          speed: 10,
        } as any
      }
      plugins={[
        Autoscroll({
          startDelay: 0,
          speed: 2,
          stopOnFocusIn: true,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="w-full flex space-x-4">
        {items &&
          items.map((project, index) => (
            <CarouselItem
              key={project._id}
              className={`max-w-64 sm:max-w-5xl max-sm:aspect-[9/16] sm:aspect-[16/9] rounded-2xl cursor-pointer relative box-content border-1 ${index === 0 ? '-mr-2' : ''}`}
            >
              <Image
                alt={`Image for ${project.title}`}
                className="max-sm:hidden h-full w-full object-cover rounded-2xl absolute left-0 top-0"
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
              />
              <Image
                alt={`Image for ${project.title}`}
                className="sm:hidden h-full w-full object-cover rounded-2xl absolute left-0 top-0"
                src={
                  project.mobileMainImage
                    ? (urlForImage(project.mobileMainImage)
                        ?.width(1080)
                        .height(1920)
                        .url() ?? LaptopSuite)
                    : LaptopSuite
                }
                height={960}
                width={540}
              />
              <div className="absolute border left-0 bottom-0 w-full bg-gradient-to-b from-transparent via-[#ffffff99] dark:via-[#00000099] via-50% to-[#ffffffcc] dark:to-[#000000cc] p-4 sm:px-6 sm:pb-4 pt-16 rounded-b-2xl flex max-sm:flex-col justify-between sm:items-end">
                <div>
                  <h1 className="text-3xl sm:text-6xl font-extrabold leading-none tracking-tight">
                    {project.title}
                  </h1>

                  {project.githubRepos && (
                    <div className="flex gap-2 items-center">
                      <GitHubSvg className="w-4 h-4 fill-current" />
                      <a
                        className="hover:underline text-red"
                        href={`https://github.com/${project.githubRepos![0]}`}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {project.githubRepos![0]}
                      </a>
                    </div>
                  )}
                  <p>{project.shortDesc}</p>
                </div>
                <div className="max-md:hidden">
                  <ActionButton href={`/about/contact`}>
                    {t('projectsPromo.action')}
                  </ActionButton>
                </div>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  )
}
