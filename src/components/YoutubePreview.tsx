import { Flex, Text } from '@sanity/ui'
import { FC } from 'react'
import YouTubePlayer from 'react-player/youtube'
import { PreviewProps } from 'sanity'

export const YouTubePreview: FC<PreviewProps> = ({ title: url, subtitle }) => (
  <Flex padding={3} direction="column">
    <Text size={1} style={{ marginBottom: '1rem' }}>
      YouTube Embed{subtitle && ' with body'}
    </Text>
    <Flex align="center" justify="center">
      {typeof url === 'string' ? (
        <YouTubePlayer url={url} />
      ) : (
        <Text>Add a YouTube URL</Text>
      )}
    </Flex>
    <Text size={1} style={{ marginTop: '1rem' }}>
      {subtitle as string}
    </Text>
  </Flex>
)
