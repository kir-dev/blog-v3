'use client'

import { useTranslations } from 'next-intl'
import React, { useEffect, useMemo, useState } from 'react'
import { environment } from '~/utils/environment'
import { LogoNoText } from '../svg-components/LogoNoText'
import { Line } from './helpers/Line'
import { Frame, Keyframes } from './react-keyframes'

const sleepDuration = 500
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5)

export const Terminal: React.FC = () => {
  const [lineCount, setLineCount] = useState(0)
  const [opacity, setOpacity] = useState(0)
  const t = useTranslations('Index')

  const rand = useMemo(
    () => ({
      ms: 542,
      modules: 148,
    }),
    [],
  )

  useEffect(() => {
    if (lineCount >= 3) {
      setOpacity(0.2)
    }
  }, [lineCount])

  const showLine = (text: string, name?: string) => {
    const frames: React.ReactElement[] = [
      <Frame key={`${text}-last`}>
        <Line name={name} text={text} noCaret noPrompt />
      </Frame>,
    ]

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  const emptyLine = () => {
    const frames: React.ReactElement[] = []

    for (let i = 0; i < 10; i += 1) {
      frames.push(
        <Frame duration={sleepDuration} key={`${i}`}>
          <Line noCaret={i % 2 === 0} />
        </Frame>,
      )
    }

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c)}>
        {frames}
      </Keyframes>
    )
  }

  const renderLine = (text: string) => {
    const frames: React.ReactElement[] = []

    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>,
    )

    for (let i = 0; i < text.length; i += 1) {
      const isLastLetter = i === text.length - 1
      const duration = isLastLetter ? sleepDuration : getTypingDuration()
      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>,
      )
    }

    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>,
    )

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  return (
    <div className="text-xs sm:text-sm md:text-base lg:text-md h-64 sm:h-80 lg:h-96 w-full max-w-md sm:max-w-full sm:w-[28rem] md:w-[32rem] lg:w-[36rem]">
      <div className='h-full border-1 rounded-lg border-foreground border-opacity-20 flex flex-col relative before:rounded-lg before:z-0 before:block before:absolute before:w-full before:h-full before:content-[""] before:bg-foreground before:opacity-5'>
        <div className="flex flex-row items-center z-10 rounded-t-lg">
          <div className="flex flex-row flex-1 ml-1 py-3">
            <a
              href={environment.rickrollUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Terminal close button"
              className="w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 ml-1 sm:ml-1.5 lg:ml-2 rounded-full bg-orange-600"
            />
            <div className="w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 ml-1 sm:ml-1.5 lg:ml-2 rounded-full bg-yellow-400" />
            <div className="w-2 sm:w-3 lg:w-4 h-2 sm:h-3 lg:h-4 ml-1 sm:ml-1.5 lg:ml-2 rounded-full bg-green-400" />
          </div>
        </div>
        <div className="z-10 flex-1 font-mono p-3">
          {renderLine('yarn run start:kir-dev')}
          {lineCount >= 1 &&
            showLine('Kir-Dev is running in development mode', '[yarn] ')}
          {lineCount >= 2 && renderLine('yarn run render:logo')}
          {lineCount >= 3 && renderLine('yarn run render:about-us')}
          {lineCount >= 4 && showLine('○ Compiling /about-us ...')}
          {lineCount >= 5 &&
            showLine(t('terminalTexts.line5'), '[Kir-Dev web] ')}
          {lineCount >= 6 &&
            showLine(t('terminalTexts.line6'), '[Kir-Dev web] ')}
          {lineCount >= 7 &&
            showLine(
              `✓ Compiled /about-us in ${rand.ms}ms (${rand.modules} modules)`,
            )}
          {lineCount >= 8 && emptyLine()}
        </div>
        {opacity > 0 && (
          <div
            className="h-48 absolute end-1 bottom-1 transition-opacity"
            style={{ opacity }}
          >
            <LogoNoText className="h-full" />
          </div>
        )}
      </div>
    </div>
  )
}
