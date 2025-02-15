import { lazy } from 'react'

export const LazyFeatureAbout = lazy(() => import('./feature-about.tsx'))
export const LazyFeatureHome = lazy(() => import('./feature-home.tsx'))
