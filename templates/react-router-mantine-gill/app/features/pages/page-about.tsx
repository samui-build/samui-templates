import type { Route } from './+types/page-about'
import { UiPage } from '~/ui'
import { LucideInfo } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'About - Placeholder' },
    { name: 'description', content: 'The Placeholder About page' },
  ]
}

export default function About() {
  return (
    <UiPage title="About" icon={<LucideInfo />}>
      About Page
    </UiPage>
  )
}
