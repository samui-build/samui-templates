import { Connection } from '@solana/web3.js'
import { getConfig } from './get-config'
import { getConnection } from './get-connection'
import { getUmi, Umi } from './get-umi'

export interface Context {
  connection: Connection
  umi: Umi
}

export function getContext(): Context {
  const config = getConfig()

  return {
    connection: getConnection({ endpoint: config.solanaRpcEndpoint, commitment: config.commitment }),
    umi: getUmi({ endpoint: config.solanaRpcEndpoint, commitment: config.commitment }),
  }
}
