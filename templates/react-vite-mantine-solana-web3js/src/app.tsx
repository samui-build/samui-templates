import './app-theme-styles.ts'
import { AppRoutes } from './app-routes.tsx'
import { AppTheme } from './app-theme.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={client}>
      <AppTheme>
        <AppRoutes />
      </AppTheme>
    </QueryClientProvider>
  )
}
