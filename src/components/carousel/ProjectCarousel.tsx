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
      <CarouselContent className="w-full flex space-x-4 m-0">
        {items &&
          items.map((project, index) => (
            <CarouselItem
              key={project._id}
              className={`max-w-64 sm:max-w-5xl max-sm:aspect-[9/16] sm:aspect-[16/9] rounded-2xl cursor-pointer relative box-content border-1`}
            >
              <Image
                alt={`Image for ${project.title}`}
                className="h-full w-full object-cover rounded-2xl absolute left-0 top-0"
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
              {/* Gradient Overlay */}
              <div className="absolute left-0 bottom-0 w-full bg-gradient-to-b from-transparent to-60% to-[#ffffffaa] dark:to-[#000000aa] p-4 sm:px-6 sm:pb-4 pt-16 rounded-b-2xl flex max-sm:flex-col justify-between sm:items-end">
                <div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold leading-none tracking-tight">
                    {project.title}
                  </h1>
                  <p>{project.shortDesc}</p>
                </div>
                <ActionButton href={`/projects/${project.slug}`}>
                  {t('projectsPromo.action')}
                </ActionButton>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  )
}
