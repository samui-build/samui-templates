import { createSolanaClient } from 'gill'

export function getSolanaClient({ endpoint }: { endpoint: string }) {
  return createSolanaClient({
    urlOrMoniker: endpoint,
  })
}

export type SolanaClient = ReturnType<typeof getSolanaClient>
