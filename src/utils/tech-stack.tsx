import { CpuChipIcon } from '@heroicons/react/24/solid'

import { NestSvg } from '~/components/svg-components/NestSvg'
import { NextSvg } from '~/components/svg-components/NextSvg'
import { RailsSvg } from '~/components/svg-components/RailsSvg'
import { ReactSvg } from '~/components/svg-components/ReactSvg'
import { SpringSvg } from '~/components/svg-components/SpringSvg'

export function getStackSvg(key: string) {
  switch (key.toLowerCase()) {
    case 'nest':
      return <NestSvg className="w-14 h-14" id="tech-svg" />
    case 'next':
      return <NextSvg className="w-14 h-14" id="tech-svg" />
    case 'react':
    case 'react-native':
      return <ReactSvg className="w-14 h-14" id="tech-svg" />
    case 'spring':
      return <SpringSvg className="w-14 h-14" id="tech-svg" />
    case 'rails':
      return <RailsSvg className="w-14 h-14" id="tech-svg" />
    default:
      return <CpuChipIcon className="w-14 h-14" id="tech-svg" />
  }
}
