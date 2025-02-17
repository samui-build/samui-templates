import { createSolanaClient } from 'gill'

export function getSolanaClient(props: { endpoint?: string } = {}) {
  const endpoint = props.endpoint ?? process.env.VITE_SOLANA_RPC_ENDPOINT
  if (!endpoint?.trim()?.length) {
    throw new Error('getSolanaClient: VITE_SOLANA_RPC_ENDPOINT is not set')
  }

  if (!endpoint.startsWith('http')) {
    throw new Error('getSolanaClient: VITE_SOLANA_RPC_ENDPOINT must start with http')
  }

  return createSolanaClient({ urlOrMoniker: endpoint })
}

export type SolanaClient = ReturnType<typeof getSolanaClient>
