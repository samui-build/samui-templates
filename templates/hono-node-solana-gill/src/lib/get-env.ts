import type { Context } from 'hono'
import { env } from 'hono/adapter'

export function getEnv(c: Context) {
  return env<{ ALLOWED_ORIGINS: string; SOLANA_RPC_ENDPOINT: string }>(c)
}
