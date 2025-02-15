import type { Commitment } from '@solana/web3.js'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'

export function getUmi({ commitment = 'confirmed', endpoint }: { commitment?: Commitment; endpoint: string }) {
  const umi = createUmi(endpoint, { commitment })

  return umi
}

export type Umi = ReturnType<typeof getUmi>
