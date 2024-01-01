import { NestSvg } from '~/components/svg-components/NestSvg'
import { NextSvg } from '~/components/svg-components/NextSvg'
import { RailsSvg } from '~/components/svg-components/RailsSvg'
import { ReactSvg } from '~/components/svg-components/ReactSvg'
import { SpringSvg } from '~/components/svg-components/SpringSvg'

export const techStack = [
  {
    svg: NestSvg,
    title: 'NestJS',
    text: 'REST API Node.js felett, többrétegű architektúra. ORM Prisma használatával, PostgreSQL adatbázissal.',
  },
  {
    svg: NextSvg,
    title: 'Next.js',
    text: 'Modern full-stack Node.js + React keretrendszer. Routing, SSG, SSR. Élesítések a Vercel platformján.',
  },
  {
    svg: ReactSvg,
    title: 'React',
    text: 'UI komponensek építése. Mobile-first megközelítés. TanStack, React Hook Form, ChakraUI, Tailwind.',
  },
  {
    svg: SpringSvg,
    title: 'Spring Boot',
    text: 'Full-stack fejlesztés Kotlin nyelven. Mikroszolgáltatás megközelítés, nagy számításigényű rendszerek.',
  },
  {
    svg: RailsSvg,
    title: 'Ruby on Rails',
    text: 'Full-stack fejlesztés Ruby nyelven. Villámgyors megoldás mindenre. Kimenő technológia nálunk.',
  },
  {
    svg: ReactSvg,
    title: 'React Native',
    text: 'Android, iOS. Expo ökoszisztéma, TypeScript. Frissen felvett technológia.',
  },
]
