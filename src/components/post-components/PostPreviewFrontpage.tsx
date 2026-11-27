'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { Chip } from '~/components/ui/Chip'
import { UserCard } from '~/components/ui/UserCard'
import { Link } from '~/i18n/navigation'
import { getMediaUrl } from '~/lib/media'
import type { EnrichedPost } from '~/lib/payload'
import type { Member } from '~/payload-types'
import { getAdaptiveImageUrl } from '~/utils/adaptive-member-image'
import { formatDate } from '~/utils/date-utils'

interface Props {
  post: EnrichedPost
  author?: Member | null
}

export default function PostPreviewFrontpage({ post, author }: Props) {
  const { resolvedTheme } = useTheme()
  const t = useTranslations()
  const imageSrc = getMediaUrl(post.mainImage) ?? '/images/card-example-2.jpeg'

  return (
    <article className="flex flex-col sm:flex-row gap-8">
      <div className="flex-1 px-4 flex flex-col justify-center">
        <header>
          <h4 className="text-4xl font-extrabold tracking-tight my-2">
            <Link href={`/post/${post.slug}`}>{post.title}</Link>
          </h4>
        </header>
        <footer>
          <p className="mb-8 text-foreground-400">
            {post.excerpt} &bull; ~{post.estimatedReadingTime}&nbsp;min
          </p>
          <UserCard
            name={
              author
                ? t('Members.nameFormat', {
                    firstName: author.firstName,
                    lastName: author.lastName,
                  })
                : post.authorUsername ?? 'anonymous'
            }
            description={
              author?.rank ? t(`Members.rank.${author.rank}`) : undefined
            }
            avatarSrc={
              author
                ? getAdaptiveImageUrl(author, false, resolvedTheme)
                : undefined
            }
            fallback={
              author ? `${author.lastName[0]}${author.firstName[0]}` : 'AN'
            }
          />
        </footer>
      </div>
      <div className="flex-1 flex justify-end px-4">
        <div className="max-w-xl flex flex-col justify-center">
          <Link
            href={`/post/${post.slug}`}
            className="block md:h-48 lg:h-64 xl:h-80"
          >
            <Image
              alt={`Image for ${post.title}`}
              className="z-0 w-full h-full object-cover rounded-lg"
              src={imageSrc}
              height={700}
              width={1000}
            />
          </Link>
          <div className="flex flex-row justify-between items-center mt-2">
            <p className="text-tiny">{formatDate(post.publishedAt)}</p>
            {post.hashTag && <Chip size="sm">#{post.hashTag}</Chip>}
          </div>
        </div>
      </div>
    </article>
  )
}
