import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { assertIsAddress } from 'gill'
import { getCorsOrigins } from './lib/get-cors-origins'
import { getSolanaClient } from './lib/get-solana-client'

const app = new Hono()

app.use(
  cors({
    origin: (origin, c) => (getCorsOrigins(c)?.includes(origin) ? origin : null),
  }),
)

app.get('/', (c) => {
  return c.text('hono-cloudflare-workers-solana-gill')
})

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

export default app
