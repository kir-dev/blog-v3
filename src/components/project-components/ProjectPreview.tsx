import { Badge, Chip } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { urlForImage } from '~/lib/sanity.image'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Project } from '~/lib/sanity.types'
import { GitHubSvg } from '../svg-components/GitHubSvg'
import LaptopSuite from '../svg/laptop-suite.svg'

export default function ProjectPreview({ project }: { project: Project }) {
  const router = useRouter()
  const t = useTranslations()

  return (
    <div className="w-full">
      <header>
        <Badge
          content={t(`Projects.status.${project.status}`)}
          color={
            project.status === 'discontinued'
              ? 'danger'
              : project.status === 'new'
                ? 'secondary'
                : 'success'
          }
          placement="bottom-right"
          classNames={{
            base: 'aspect-[21/9] w-full',
            badge: 'text-xs px-1.5 py-0.5',
          }}
        >
          <Image
            alt={`Image for ${project.title}`}
            className={`z-0 w-full h-full object-contain rounded-lg cursor-pointer`}
            src={
              project.mainImage
                ? urlForImage(project.mainImage)
                    ?.width(1280)
                    .height(540)
                    .url() ?? LaptopSuite
                : LaptopSuite
            }
            height={540}
            width={1280}
            onClick={() => router.push(`/project/${project.slug.current}`)}
          />
        </Badge>
        <h4 className="text-3xl font-extrabold tracking-tight my-2">
          <Link href={`/project/${project.slug.current}`}>{project.title}</Link>
        </h4>
      </header>
      <footer>
        <p className="mb-2">{project.shortDesc}</p>
        <div className="flex items-center gap-2 mt-2">
          {project.techStacks?.map((techStack, index) => (
            <Chip key={`${techStack}-${index}`} size="sm">
              {techStack}
            </Chip>
          ))}
        </div>
        {project.githubRepos?.map((p) => (
          <div
            key={p}
            className="flex items-center gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
          >
            <GitHubSvg className="w-4 h-4 fill-current" />
            <a
              className="hover:underline"
              href={`https://github.com/${p}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {p}
            </a>
          </div>
        ))}
      </footer>
    </div>
  )
}
