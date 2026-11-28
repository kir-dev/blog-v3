import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Badge } from '~/components/ui/Badge'
import { Chip } from '~/components/ui/Chip'
import { Link } from '~/i18n/navigation'
import { getMediaUrl } from '~/lib/media'
import type { Project } from '~/payload-types'
import { GitHubSvg } from '../svg-components/GitHubSvg'
import LaptopSuite from '../svg/laptop-suite.svg'

export default function ProjectPreview({ project }: { project: Project }) {
  const t = useTranslations()
  const mediaUrl = getMediaUrl(project.mainImage)
  const imageSrc = mediaUrl ?? LaptopSuite
  const statusLabel = project.status
    ? t(`Projects.status.${project.status}`)
    : undefined

  return (
    <div className="w-full">
      <header>
        <Badge
          content={statusLabel}
          color={
            project.status === 'discontinued'
              ? 'danger'
              : project.status === 'new'
                ? 'secondary'
                : 'success'
          }
          placement="bottom-right"
          className="aspect-[21/9] w-full"
          badgeClassName="text-xs px-1.5 py-0.5"
        >
          <Link href={`/project/${project.slug}`} className="block w-full h-full">
            <Image
              alt={`Image for ${project.title}`}
              className={`z-0 w-full h-full ${mediaUrl ? 'object-cover' : 'object-contain'} rounded-lg cursor-pointer`}
              src={imageSrc}
              height={540}
              width={1280}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>
        </Badge>
        <h4 className="text-3xl font-extrabold tracking-tight my-2">
          <Link href={`/project/${project.slug}`}>{project.title}</Link>
        </h4>
      </header>
      <footer>
        <p className="mb-2">{project.shortDesc}</p>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          {project.techStacks?.map((techStack, index) => (
            <Chip key={`${techStack.name}-${index}`} size="sm">
              {techStack.name}
            </Chip>
          ))}
        </div>
        {project.githubRepos?.map((item) => (
          <div
            key={item.repo}
            className="flex items-center gap-2 mt-2 text-foreground text-opacity-70 hover:text-opacity-100"
          >
            <GitHubSvg className="w-4 h-4 fill-current" />
            <a
              className="hover:underline"
              href={`https://github.com/${item.repo}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.repo}
            </a>
          </div>
        ))}
      </footer>
    </div>
  )
}
