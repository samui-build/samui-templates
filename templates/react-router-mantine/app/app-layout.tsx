import { LucideFiles, LucideHome, LucideSettings } from 'lucide-react'
import { Outlet } from 'react-router'
import { UiLayout } from '~/ui'

export default function AppLayout() {
  return (
    <UiLayout
      headerLinks={[
        //
        { label: 'Home', to: '/home' },
      ]}
      navbarLinkGroups={[
        { label: 'Home', to: '/home', icon: LucideHome },
        {
          label: 'Pages',
          icon: LucideFiles,
          links: [
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
            { label: 'Pricing', to: '/pricing' },
          ],
        },
        {
          label: 'Settings',
          icon: LucideSettings,
          to: '/settings',
        },
      ]}
    >
      <Outlet />
    </UiLayout>
  )
}
