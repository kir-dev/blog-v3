import { Chip, User } from '@nextui-org/react'
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
            name={author?.name ?? post.author ?? 'anonymous'}
            description={author?.rank}
            avatarProps={{
              src: getAdaptiveImageUrl(author, false, theme),
              size: 'sm',
              showFallback: true,
              fallback:
                (author?.name ?? post.author)
                  ?.match(/(^\S\S?|\s\S)?/g)
                  .map((v) => v.trim())
                  .join('')
                  .match(/(^\S|\S$)?/g)
                  .join('')
                  .toLocaleUpperCase() ?? 'AN',
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
              src={urlForImage(post.mainImage)?.width(1000).height(700).url()}
              height={700}
              width={1000}
            />
          </Link>
          <div className="flex flex-row justify-between items-center mt-2">
            <p className="text-tiny">{formatDate(post._createdAt)}</p>
            <Chip size="sm">#közélet</Chip>
          </div>
        </div>
      </div>
    </article>
  )
}
