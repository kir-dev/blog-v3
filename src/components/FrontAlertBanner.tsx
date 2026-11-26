'use client'

import React, { useEffect, useState } from 'react'
import type { SiteSection } from '~/payload-types'
import { RichText } from './RichText'
import { Chip } from './ui/Chip'

interface Props {
  frontAlert?: SiteSection | null
}

export const FrontAlertBanner: React.FC<Props> = ({ frontAlert }) => {
  const [alertShown, setAlertShown] = useState(false)
  const alertVersion = frontAlert?.contentUpdatedAt ?? frontAlert?.updatedAt ?? ''

  useEffect(() => {
    if (!frontAlert || frontAlert.isHidden) {
      setAlertShown(false)
      return
    }
    const ignored = localStorage.getItem('lastIgnoredAlertUpdatedAt')
    setAlertShown(ignored !== alertVersion)
  }, [frontAlert, alertVersion])

  if (!alertShown || !frontAlert) return null

  const closeAlert = () => {
    localStorage.setItem('lastIgnoredAlertUpdatedAt', alertVersion)
    setAlertShown(false)
  }

  return (
    <Chip
      onClose={closeAlert}
      color="primary"
      className="absolute top-16 sm:top-20 z-50"
    >
      <RichText data={frontAlert.body} variant="frontAlert" />
    </Chip>
  )
}
