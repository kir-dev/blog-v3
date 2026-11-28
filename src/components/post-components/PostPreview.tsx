'use client'

import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react'
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

const PostPreview: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props
> = ({ post, author, className, ...props }) => {
  const { resolvedTheme } = useTheme()
  const t = useTranslations()
  const imageSrc = getMediaUrl(post.mainImage) ?? '/images/card-example-2.jpeg'

  return (
    <article {...props} className={`w-full ${className ?? ''}`}>
      <header>
        <Link href={`/post/${post.slug}`} className="block h-48 xl:h-64">
          <Image
            alt={`Image for ${post.title}`}
            className="z-0 w-full h-full object-cover rounded-lg"
            src={imageSrc}
            height={300}
            width={500}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>
        <div className="text-tiny text-foreground-500 text-end flex flex-row justify-between mt-2">
          <div>{formatDate(post.publishedAt)}</div>
          <div>~{post.estimatedReadingTime} min</div>
        </div>
        <h4 className="text-3xl font-extrabold tracking-tight mb-2 mt-6">
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h4>
        <p className="mb-8">{post.excerpt}</p>
      </header>
      <footer className="flex justify-between items-center flex-wrap gap-y-2">
        <UserCard
          name={
            author
              ? t('Members.nameFormat', {
                  firstName: author.firstName,
                  lastName: author.lastName,
                })
              : post.authorUsername ?? 'anonymous'
          }
          description={author?.rank ? t(`Members.rank.${author.rank}`) : undefined}
          avatarSrc={
            author ? getAdaptiveImageUrl(author, false, resolvedTheme) : undefined
          }
          fallback={
            author ? `${author.lastName[0]}${author.firstName[0]}` : 'AN'
          }
        />
        {post.hashTag && <Chip size="sm">#{post.hashTag}</Chip>}
      </footer>
    </article>
  )
}

export default PostPreview
