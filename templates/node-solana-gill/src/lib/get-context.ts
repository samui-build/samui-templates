import { getConfig } from './get-config'
import { getSolanaClient, SolanaClient } from './get-solana-client'

export interface Context {
  client: SolanaClient
}

export function getContext(): Context {
  const config = getConfig()

  return {
    client: getSolanaClient({ endpoint: config.solanaRpcEndpoint }),
  }
}
