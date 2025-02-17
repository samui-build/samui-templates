import { index, layout, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('./app-layout.tsx', [
    index('./features/index.tsx'),
    route('/home', './features/home/home.tsx'),
    route('/about', './features/pages/page-about.tsx'),
    route('/contact', './features/pages/page-contact.tsx'),
    route('/pricing', './features/pages/page-pricing.tsx'),
    route('/settings/*', './features/settings/settings.tsx'),
    route('*', './features/not-found/not-found.tsx'),
  ]),
] satisfies RouteConfig
