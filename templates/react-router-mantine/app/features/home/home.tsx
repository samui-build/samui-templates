import type { Route } from './+types/home'
import { UiPage } from '~/ui'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'Home - Placeholder' },
    { name: 'description', content: 'The Placeholder Home page' },
  ]
}

export default function Home() {
  return <UiPage title="Home">Welcome Home!</UiPage>
}
