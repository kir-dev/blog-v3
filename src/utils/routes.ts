import {
  BookOpenIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  NewspaperIcon,
  RocketLaunchIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid'
import { FC, SVGProps } from 'react'

export type Route =
  | {
      key: string
      label: string
      href: string
      keywords: string
      routes?: never
      icon: FC<SVGProps<SVGSVGElement>>
    }
  | {
      key: string
      label: string
      href?: never
      keywords?: never
      routes: Route[]
      icon?: never
    }

export const allRoutes: { homeRoute: Route; otherRoutes: Route[] } = {
  homeRoute: {
    key: 'home',
    label: 'Kezdőlap',
    href: '/',
    keywords: 'kezdőlap, home, főoldal, start, kir-dev',
    icon: HomeIcon,
  },
  otherRoutes: [
    {
      key: 'blog',
      label: 'Blog',
      href: '/blog',
      keywords:
        'blog, cikk, cikkek, posztok, articles, posts, tutorials, news, updates',
      icon: NewspaperIcon,
    },
    {
      key: 'about',
      label: 'Rólunk',
      routes: [
        {
          key: 'history',
          label: 'Történelem',
          href: '/about/history',
          keywords:
            'történelem, history, about, rólunk, kir-dev, kirdev, kultúra, culture, vision',
          icon: BookOpenIcon,
        },
        {
          key: 'members',
          label: 'Csapatunk',
          href: '/about/members',
          keywords:
            'csapatunk, members, team, tagok, tag, member, senior, developer',
          icon: UserGroupIcon,
        },
        {
          key: 'projects',
          label: 'Projektjeink',
          href: '/about/projects',
          keywords:
            'projektjeink, projects, projektek, project, open-source, nyílt forráskódú, open source, nyílt forráskód',
          icon: Square3Stack3DIcon,
        },
        {
          key: 'contact',
          label: 'Kapcsolat',
          href: '/about/contact',
          keywords: 'elérhetőségeink, contact, kapcsolat, email, phone',
          icon: ChatBubbleOvalLeftEllipsisIcon,
        },
      ],
    },
    {
      key: 'courses',
      label: 'Tanfolyam',
      href: '/courses',
      keywords:
        'tanfolyam, courses, kurzus, mentor, course, tanfolyamok, tanulás, learning, education, oktatás, oktatási',
      icon: RocketLaunchIcon,
    },
  ],
}
