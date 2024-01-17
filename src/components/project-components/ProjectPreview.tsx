import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
} from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { urlForImage } from '~/lib/sanity.image'
import { type Project } from '~/lib/sanity.queries'
import { formatDate } from '~/utils/date-utils'

export default function ProjectPreview({ project }: { project: Project }) {
  const router = useRouter()
  return (
    <article className="w-full">
      <header>
        <div className="h-48 xl:h-64">
          <Image
            alt={`Image for ${project.title}`}
            className="z-0 w-full h-full object-cover rounded-lg"
            src={urlForImage(project.mainImage).width(500).height(300).url()}
            height={300}
            width={500}
          />
        </div>
        <h4 className="text-3xl font-extrabold tracking-tight my-2">
          <Link href={`/project/${project.slug.current}`}>{project.title}</Link>
        </h4>
      </header>
      <footer className="text-foreground text-opacity-50">
        <p className="mb-2">{project.shortDesc}</p>
        <div className="flex justify-between items-center mt-2">
          {project.techStacks.map((techStack) => (
            <Chip key={techStack} size="sm">
              {techStack}
            </Chip>
          ))}
        </div>
      </footer>
    </article>
  )
}
