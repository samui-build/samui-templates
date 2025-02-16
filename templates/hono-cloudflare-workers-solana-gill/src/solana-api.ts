import { Hono } from 'hono'
import { assertIsAddress } from 'gill'
import { getSolanaClient } from './lib/get-solana-client.js'

export function createSolanaApi(prefix = '/solana') {
  const app = new Hono()

  app.get('/', (c) => c.text('Solana API'))
  app.get('', (c) => c.text('Solana API')) // Handle `/solana-auth/` and `/solana-auth`

  app.get('/balance/:address', async (c) => {
    const address = c.req.param('address')

    if (!address) {
      c.status(400)
      return c.json({ error: 'Invalid address' })
    }

    assertIsAddress(address)

    const client = getSolanaClient(c)
    try {
      const result = await client.rpc.getBalance(address).send()

      return c.json({ address, balance: result.value.toString() })
    } catch (error) {
      c.status(400)
      console.error(error)
      return c.json({ error: `Error fetching wallet` })
    }
  })

  app.get('/genesis-hash', async (c) => {
    const client = getSolanaClient(c)
    try {
      const result = await client.rpc.getGenesisHash().send()

      return c.json({ genesisHash: `${result.toString()}` })
    } catch (error) {
      c.status(400)
      console.error(error)
      return c.json({ error: `Error fetching genesis hash` })
    }
  })

  return { prefix, app }
}
