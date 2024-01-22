'use client'

import {
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/solid'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { useTheme } from 'next-themes'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { Route } from '~/utils/routes'

import { LogoAnimated } from '../svg-components/LogoAnimated'

export interface Props {
  routes: { homeRoute: Route; otherRoutes: Route[] }
}

export const NavbarSitewide: FC<PropsWithChildren<Props>> = ({ routes }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false)
  const pathname = usePathname()
  const router = useRouter()
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }, [isMenuOpen, pathname])

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <NextLink aria-label="Kezdőlap" href="/">
            <LogoAnimated style={{ height: '1rem' }} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routes.otherRoutes.map((route) =>
          route.routes?.length ? (
            <Dropdown key={route.key}>
              <NavbarItem>
                <DropdownTrigger>
                  <Button
                    disableRipple
                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                    endContent={<ChevronDownIcon className="h-3 w-3" />}
                    radius="sm"
                    variant="light"
                  >
                    {route.label}
                  </Button>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                aria-label={route.label}
                className="w-[340px]"
                itemClasses={{
                  base: 'gap-4',
                }}
              >
                {route.routes.map((subRoute) => (
                  <DropdownItem
                    key={subRoute.key}
                    startContent={
                      subRoute.icon ? (
                        <subRoute.icon className="h-4 w-4" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4" />
                      )
                    }
                    onClick={() => router.push(subRoute.href)}
                  >
                    {subRoute.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={route.key}>
              <NextLink
                color="foreground"
                className="text-md"
                href={route.href}
                aria-label={route.label}
              >
                {route.label}
              </NextLink>
            </NavbarItem>
          ),
        )}
      </NavbarContent>

      <NavbarContent className="flex gap-2" justify="end">
        <NavbarItem className="flex h-full items-center">
          <Button
            isIconOnly
            aria-label="Theme switcher"
            className="p-0 bg-transparent data-[hover=true]:bg-transparent"
            onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex gap-4 pt-4 bg-background bg-opacity-70">
        {routes.otherRoutes
          .flatMap((item) => (item.routes?.length ? item.routes : item))
          .map((item) => (
            <NavbarMenuItem key={item.key} className="flex items-center gap-3">
              {item.icon ? (
                <item.icon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
              )}
              <NextLink
                className="w-full text-lg"
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </Navbar>
  )
}
