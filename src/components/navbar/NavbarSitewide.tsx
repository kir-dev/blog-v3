'use client'

import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { useLocale, useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Link, usePathname, useRouter } from '~/i18n/navigation'
import { allRoutes } from '~/utils/routes'
import { LogoAnimated } from '../svg-components/LogoAnimated'

export const NavbarSitewide: FC = () => {
  const routes = allRoutes
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()
  const { setTheme, resolvedTheme } = useTheme()
  const t = useTranslations('common.navbar')

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'hu' : 'en'
    router.replace(pathname, { locale: nextLocale })
  }

  const isDark = mounted ? resolvedTheme === 'dark' : true

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-lg bg-background/70 border-b border-foreground/10">
      <nav className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-default/50 transition-colors"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <Link aria-label={t('home')} href="/" className="flex items-center">
            <LogoAnimated style={{ height: '1rem' }} />
          </Link>
        </div>

        <div
          ref={dropdownRef}
          className="hidden sm:flex items-center gap-6"
        >
          {routes.otherRoutes.map((route) =>
            route.routes?.length ? (
              <div key={route.key} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown((prev) =>
                      prev === route.key ? null : route.key,
                    )
                  }
                  className="inline-flex items-center gap-1.5 text-base font-medium hover:text-primary transition-colors"
                >
                  <span>{t(`routes.${route.key}`)}</span>
                  <ChevronDownIcon
                    className={`h-3 w-3 transition-transform ${
                      openDropdown === route.key ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openDropdown === route.key && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-3 w-72 rounded-xl border border-foreground/15 bg-background p-2 shadow-lg z-50">
                    {route.routes.map((subRoute) => (
                      <Link
                        key={subRoute.key}
                        href={subRoute.href ?? '/'}
                        onClick={() => setOpenDropdown(null)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-default/60 transition-colors"
                      >
                        {subRoute.icon ? (
                          <subRoute.icon className="h-4 w-4 shrink-0" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4 shrink-0" />
                        )}
                        <span>{t(`routes.${subRoute.key}`)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={route.key}
                href={route.href ?? '/'}
                aria-label={t(`routes.${route.key}`)}
                className="text-base font-medium hover:text-primary transition-colors"
              >
                {t(`routes.${route.key}`)}
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t('langSwitcher')}
            onClick={switchLocale}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-default/50 text-sm font-medium hover:bg-default transition-colors"
          >
            {locale === 'en' ? 'HU' : 'EN'}
          </button>
          <button
            type="button"
            aria-label={t('themeSwitcher')}
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-default/50 hover:bg-default transition-colors"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="sm:hidden border-t border-foreground/10 bg-background/95 backdrop-blur-lg px-6 py-4 flex flex-col gap-3">
          {routes.otherRoutes
            .flatMap((item) => (item.routes?.length ? item.routes : item))
            .map((item) => (
              <Link
                key={item.key}
                href={item.href ?? '/'}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 py-1.5 text-lg hover:text-primary transition-colors"
              >
                {item.icon ? (
                  <item.icon className="h-5 w-5" />
                ) : (
                  <ChevronRightIcon className="h-5 w-5" />
                )}
                <span>{t(`routes.${item.key}`)}</span>
              </Link>
            ))}
        </div>
      )}
    </header>
  )
}
