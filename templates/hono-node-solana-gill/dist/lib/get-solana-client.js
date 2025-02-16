import { getEnv } from './get-env.js';
import { createSolanaClient } from 'gill';
export function getSolanaClient(c) {
    console.log(`env: ${JSON.stringify(getEnv(c))}`);
    const endpoint = getEnv(c).SOLANA_RPC_ENDPOINT;
    if (!endpoint?.length) {
        throw new Error('SOLANA_RPC_ENDPOINT is not set');
    }
    return createSolanaClient({ urlOrMoniker: endpoint });
}
