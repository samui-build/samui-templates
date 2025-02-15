import 'dotenv/config'
import { Commitment } from '@solana/web3.js'

export type Config = {
  commitment: Commitment
  solanaRpcEndpoint: string
}

export function getConfig(): Config {
  const config = {
    commitment: 'confirmed',
    solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
  }

  if (!config.solanaRpcEndpoint) {
    throw new Error('SOLANA_RPC_ENDPOINT is not set')
  }

  return config as Config
}
