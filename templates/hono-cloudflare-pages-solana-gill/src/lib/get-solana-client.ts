import { Context } from 'hono'
import { getEnv } from './get-env.js'
import { createSolanaClient } from 'gill'

export type SolanaClient = ReturnType<typeof createSolanaClient>

export function getSolanaClient(c: Context): SolanaClient {
  const endpoint: string = getEnv(c).SOLANA_RPC_ENDPOINT
  if (!endpoint.length) {
    throw new Error('SOLANA_RPC_ENDPOINT is not set')
  }

  return createSolanaClient({ urlOrMoniker: endpoint })
}
