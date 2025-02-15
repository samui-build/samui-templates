import { Commitment, Connection } from '@solana/web3.js'

export function getConnection({ endpoint, commitment }: { endpoint: string; commitment: Commitment }) {
  return new Connection(endpoint, commitment)
}
