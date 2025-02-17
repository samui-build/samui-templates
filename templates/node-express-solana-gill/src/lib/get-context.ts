import { getConfig } from './get-config.js'
import { getSolanaClient, type SolanaClient } from './get-solana-client.js'

export interface Context {
  client: SolanaClient
}

export function getContext(): Context {
  const config = getConfig()

  return {
    client: getSolanaClient({ endpoint: config.solanaRpcEndpoint }),
  }
}
