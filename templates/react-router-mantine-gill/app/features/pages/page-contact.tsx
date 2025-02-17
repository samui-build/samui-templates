import type { Route } from './+types/page-contact'
import { UiPage } from '~/ui'
import { LucideContact } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'Contact - Placeholder' },
    { name: 'description', content: 'The Placeholder Contact page' },
  ]
}

export default function Contact() {
  return (
    <UiPage title="Contact" icon={<LucideContact />}>
      Contact Page
    </UiPage>
  )
}
