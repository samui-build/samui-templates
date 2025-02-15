import { Navigate, RouteObject, useRoutes } from 'react-router'
import { UiLayout } from './ui/'
import { LazyFeatureAbout, LazyFeatureHome } from './features'

export function AppRoutes() {
  const routes: RouteObject[] = [
    {
      path: '',
      element: (
        <UiLayout
          headerLinks={[
            { label: 'Home', to: '/home' },
            { label: 'About', to: '/about' },
          ]}
          navbarLinkGroups={[
            {
              label: 'Pages',
              links: [
                { label: 'Home', to: '/home' },
                { label: 'About', to: '/about' },
              ],
            },
          ]}
        />
      ),
      children: [
        { index: true, element: <Navigate to="/home" replace /> },
        { path: '/home', element: <LazyFeatureHome /> },
        { path: '/about', element: <LazyFeatureAbout /> },
      ],
    },
  ]
  return useRoutes(routes)
}
