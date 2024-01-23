import { Chip, User } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { urlForImage } from '~/lib/sanity.image'
import { Member, Post } from '~/lib/sanity.types'
import { getAdaptiveImageUrl } from '~/utils/adaptive-member-image'
import { formatDate } from '~/utils/date-utils'

interface Props {
  post: Post
  author?: Member
}

const PostPreview: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props
> = ({ post, author, ...props }) => {
  const { theme } = useTheme()

  return (
    <article {...props} className={'w-full '.concat(props.className)}>
      <header>
        <Link href={`/post/${post.slug.current}`} className="h-48 xl:h-64">
          <Image
            alt={`Image for ${post.title}`}
            className="z-0 w-full h-full object-cover rounded-lg"
            src={
              urlForImage(post.mainImage)?.width(500).height(300).url() ??
              '/images/card-example-2.jpeg'
            }
            height={300}
            width={500}
          />
        </Link>
        <div className="text-tiny text-foreground-300 text-end flex flex-row justify-between mt-2">
          <div>{formatDate(post._createdAt)}</div>
          <div>~{post.estimatedReadingTime} min</div>
        </div>
        <h4 className="text-3xl font-extrabold tracking-tight mb-2 mt-6">
          <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
        </h4>
        <p className="mb-8">{post.excerpt}</p>
      </header>
      <footer className="flex justify-between items-center flex-wrap gap-y-2">
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
        {post.hashTag && <Chip size="sm">#{post.hashTag}</Chip>}
      </footer>
    </article>
  )
}

export default PostPreview
