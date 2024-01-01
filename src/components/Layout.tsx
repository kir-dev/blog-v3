import { allRoutes } from '~/utils/routes'

import Footer from './Footer'
import { NavbarSitewide } from './navbar/NavbarSitewide'

export default function Layout({ children }) {
  return (
    <div className="d-flex flex-col min-h-screen">
      <NavbarSitewide routes={allRoutes} />
      {children}
      <Footer />
    </div>
  )
}
