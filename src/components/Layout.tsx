import React from 'react'
import Footer from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSitewide />
      <main className="flex-1 pb-10">{children}</main>
      <Footer />
    </div>
  )
}
