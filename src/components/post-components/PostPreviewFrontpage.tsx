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
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils/date-utils'

export default function PostPreviewFrontpage({ post }: { post: Post }) {
  const router = useRouter()
  return (
    <article className="flex flex-col sm:flex-row gap-8">
      <div className="flex-1 px-4 flex flex-col justify-center">
        <header>
          <h4 className="text-4xl font-extrabold tracking-tight my-2">
            <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
          </h4>
        </header>
        <footer>
          <p className="mb-2">{post.excerpt}</p>
          <div className="flex flex-row gap-2 items-center">
            <Avatar
              src={`https://pek.sch.bme.hu/photos/${post.author}`}
              name={post.author}
              showFallback
              size="md"
            />
            <div className="flex flex-col text-sm">
              {post.author ?? `anonymous`} &bull; {post.estimatedReadingTime}{' '}
              min
            </div>
          </div>
        </footer>
      </div>
      <div className="flex-1 px-4">
        <div className="max-w-xl flex flex-col justify-center">
          <div className="md:h-42 lg:h-64 xl:h-80">
            <Image
              alt={`Image for ${post.title}`}
              className="z-0 w-full h-full object-cover rounded-lg"
              src={urlForImage(post.mainImage).width(500).height(300).url()}
              height={300}
              width={500}
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-2">
            <p className="text-tiny">{formatDate(post._createdAt)}</p>
            <Chip size="sm">#közélet</Chip>
          </div>
        </div>
      </div>
    </article>
  )
}
