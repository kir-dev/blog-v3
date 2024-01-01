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

export default function PostPreview({ post }: { post: Post }) {
  const router = useRouter()
  return (
    <article className="w-full">
      <header>
        <div className="h-48 xl:h-64">
          <Image
            alt={`Image for ${post.title}`}
            className="z-0 w-full h-full object-cover rounded-lg"
            src={urlForImage(post.mainImage).width(500).height(300).url()}
            height={300}
            width={500}
          />
        </div>
        <h4 className="text-3xl font-extrabold tracking-tight my-2">
          <Link href={`/post/${post.slug.current}`}>{post.title}</Link>
        </h4>
      </header>
      <footer className="text-foreground text-opacity-50">
        <p className="mb-2">{post.excerpt}</p>
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            src={`https://pek.sch.bme.hu/photos/${post.author}`}
            name={post.author}
            showFallback
            size="sm"
          />
          <div className="flex flex-col text-sm">
            {post.author ?? `anonymous`}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-tiny">{formatDate(post._createdAt)}</p>
          <Chip size="sm">#közélet</Chip>
        </div>
      </footer>
    </article>
  )
}
