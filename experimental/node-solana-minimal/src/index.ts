// Load environment variables from .env file
import 'dotenv/config'
// Colors, yay!
import pico from 'picocolors'
// Import the Solana client and load the keypair from the .env file
import { createSolanaClient, getMonikerFromGenesisHash } from 'gill'
import { loadKeypairSignerFromFile } from 'gill/node'

console.log(pico.green('Build on Solana using gill!'))

// Get the Solana RPC endpoint from the environment variable or default to devnet
const urlOrMoniker = process.env.SOLANA_RPC_ENDPOINT || 'devnet'
const client = createSolanaClient({ urlOrMoniker })
const cluster = getMonikerFromGenesisHash(await client.rpc.getGenesisHash().send())
console.log(pico.gray(`Endpoint: ${urlOrMoniker}, cluster: ${pico.white(cluster)}`))

// Load the keypair from the .env file
const signer = await loadKeypairSignerFromFile('~/.config/solana/id.json')
console.log(pico.gray(`Signer  : ${pico.magenta(signer.address)}`))

// Get the balance of the signer
const balance = await client.rpc
  .getBalance(signer.address)
  .send()
  .then((res) => Number(res.value) / 10 ** 9)
console.log(pico.gray(`Balance : ${pico.magenta(balance)} SOL`))

// Done!
console.log(pico.green('Now go build something awesome!'))
