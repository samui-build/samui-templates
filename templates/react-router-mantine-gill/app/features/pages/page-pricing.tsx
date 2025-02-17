import type { Route } from './+types/page-pricing'
import { UiPage } from '~/ui'
import { LucideCoins } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'Pricing - Placeholder' },
    { name: 'description', content: 'The Placeholder Pricing page' },
  ]
}

export default function Pricing() {
  return (
    <UiPage title="Pricing" icon={<LucideCoins />}>
      Pricing Page
    </UiPage>
  )
}
