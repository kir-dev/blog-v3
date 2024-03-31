import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'
import { YouTubePreview } from '~/components/YoutubePreview'

export default defineType({
  name: 'youtubeEmbed',
  type: 'object',
  title: 'YouTube Embed',
  icon: <PlayIcon />,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  components: {
    preview: YouTubePreview,
  },
  preview: {
    select: {
      title: 'url',
      body: 'body',
    },
    prepare({ title, body }) {
      return {
        title,
        subtitle:
          body && body.length
            ? 'Click inside to see blockContent body'
            : undefined,
      }
    },
  },
})
