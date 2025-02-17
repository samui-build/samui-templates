import type { Route } from './+types/settings'
import { UiPageWithTabs } from '~/ui'
import { LucideSettings } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'Settings - Placeholder' },
    { name: 'description', content: 'The Placeholder Settings page' },
  ]
}

export default function Settings() {
  return (
    <UiPageWithTabs
      basePath="/settings"
      title="Settings"
      icon={<LucideSettings />}
      tabs={[
        { path: 'general', label: 'General', element: <div>General</div> },
        { path: 'appearance', label: 'Appearance', element: <div>Appearance</div> },
        { path: 'account', label: 'Account', element: <div>Account</div> },
      ]}
    />
  )
}
