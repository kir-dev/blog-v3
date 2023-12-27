import {
  Avatar,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Chip,
} from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { urlForImage } from '~/lib/sanity.image'
import { type Post } from '~/lib/sanity.queries'
import { formatDate } from '~/utils/date-utils'

export default function PostPreview({ post }: { post: Post }) {
  const router = useRouter()
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px]"
      onClick={() => router.push(`/post/${post.slug.current}`)}
    >
      <CardHeader className="absolute bg-black/60 z-10 top-0 flex-col items-start border-b-1 border-default-600 dark:border-default-100">
        <p className="text-end text-tiny text-white/60 uppercase font-bold">
          3 perc &bull; {post.excerpt}
        </p>
        <h4 className="text-white/90 font-medium text-xl">{post.title}</h4>
      </CardHeader>
      <Image
        alt={`Image for ${post.title}`}
        className="z-0 w-full h-full object-cover"
        src={urlForImage(post.mainImage).width(500).height(300).url()}
        height={300}
        width={500}
      />
      <CardFooter className="absolute bg-black/60 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">{`berenteb`}</p>
            <p className="text-tiny text-white/60">
              {formatDate(post._createdAt)}
            </p>
          </div>
        </div>
        <Chip size="sm">#közélet</Chip>
      </CardFooter>
    </Card>
  )
}
