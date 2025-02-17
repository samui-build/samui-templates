import type { Route } from './+types/not-found'
import { UiNotFound } from '~/ui'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function meta(args: Route.MetaArgs) {
  return [
    //
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ]
}

export default function NotFound() {
  return <UiNotFound />
}
