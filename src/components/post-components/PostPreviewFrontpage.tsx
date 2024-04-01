import { Chip, User } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

import { urlForImage } from '~/lib/sanity.image'
import { Member, Post } from '~/lib/sanity.types'
import { getAdaptiveImageUrl } from '~/utils/adaptive-member-image'
import { formatDate } from '~/utils/date-utils'

interface Props {
  post: Post
  author?: Member
}

export default function PostPreviewFrontpage({ post, author }: Props) {
  const { theme } = useTheme()
  const t = useTranslations()

  return (
    <article className="flex flex-col sm:flex-row gap-8">
      <div className="flex-1 px-4 flex flex-col justify-center">
        <header>
          <h4 className="text-4xl font-extrabold tracking-tight my-2">
            <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
          </h4>
        </header>
        <footer>
          <p className="mb-8 text-foreground-400">
            {post.excerpt} &bull; ~{post.estimatedReadingTime}&nbsp;min
          </p>
          <User
            name={
              author
                ? t('Members.nameFormat', {
                    firstName: author?.firstName,
                    lastName: author?.lastName,
                  })
                : post.author ?? 'anonymous'
            }
            description={author?.rank}
            avatarProps={{
              src: author
                ? getAdaptiveImageUrl(author, false, theme)
                : undefined,
              size: 'sm',
              showFallback: true,
              fallback: author
                ? `${author.lastName[0]}${author.firstName[0]}`
                : 'AN',
            }}
          />
        </footer>
      </div>
      <div className="flex-1 flex justify-end px-4">
        <div className="max-w-xl flex flex-col justify-center">
          <Link
            href={`/post/${post.slug.current}`}
            className="md:h-42 lg:h-64 xl:h-80"
          >
            <Image
              alt={`Image for ${post.title}`}
              className="z-0 w-full h-full object-cover rounded-lg"
              src={
                post.mainImage
                  ? urlForImage(post.mainImage)
                      ?.width(1000)
                      .height(700)
                      .url() ?? '/images/card-example-2.jpeg'
                  : '/images/card-example-2.jpeg'
              }
              height={700}
              width={1000}
            />
          </Link>
          <div className="flex flex-row justify-between items-center mt-2">
            <p className="text-tiny">{formatDate(post._createdAt)}</p>
            {post.hashTag && <Chip size="sm">#{post.hashTag}</Chip>}
          </div>
        </div>
      </div>
    </article>
  )
}
