import { CpuChipIcon } from '@heroicons/react/24/solid'

import { NestSvg } from '~/components/svg-components/NestSvg'
import { NextSvg } from '~/components/svg-components/NextSvg'
import { RailsSvg } from '~/components/svg-components/RailsSvg'
import { ReactSvg } from '~/components/svg-components/ReactSvg'
import { SpringSvg } from '~/components/svg-components/SpringSvg'

export function getStackSvg(key: string, fillClassName?: string) {
  const cn = `w-14 h-14 ${fillClassName}`
  switch (key.toLowerCase()) {
    case 'nest':
      return <NestSvg className={cn} id="tech-svg" />
    case 'next':
      return <NextSvg className={cn} id="tech-svg" />
    case 'react':
    case 'react-native':
      return <ReactSvg className={cn} id="tech-svg" />
    case 'spring':
      return <SpringSvg className={cn} id="tech-svg" />
    case 'rails':
      return <RailsSvg className={cn} id="tech-svg" />
    default:
      return <CpuChipIcon className={cn} id="tech-svg" />
  }
}
