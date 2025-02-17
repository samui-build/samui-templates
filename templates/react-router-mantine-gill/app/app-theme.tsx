import { MantineProvider, type MantineThemeOverride } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { appThemeOverride } from './app-theme-override'
import type { ReactNode } from 'react'

export function AppTheme({
  children,
  theme = appThemeOverride,
}: {
  children: ReactNode
  theme?: MantineThemeOverride
}) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Notifications />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  )
}
