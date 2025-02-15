import 'dotenv/config'

export type Config = {
  solanaRpcEndpoint: string
}

export function getConfig(): Config {
  const config = {
    solanaRpcEndpoint: process.env.SOLANA_RPC_ENDPOINT,
  }

  if (!config.solanaRpcEndpoint) {
    throw new Error('SOLANA_RPC_ENDPOINT is not set')
  }

  return config as Config
}
