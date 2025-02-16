import { Context } from 'hono'
import { getEnv } from './get-env.js'

export function getCorsOrigins(c: Context): string[] {
  const envOrigins: string[] = getEnv(c).ALLOWED_ORIGINS?.split(';') ?? []

  return envOrigins.map((origin) => origin.trim()).filter((origin) => origin.length > 0)
}
