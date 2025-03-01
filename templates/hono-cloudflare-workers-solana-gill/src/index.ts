import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { getCorsOrigins } from './lib/get-cors-origins.js'
import { createSolanaApi } from './solana-api.js'

const app = new Hono()
const solanaApi = createSolanaApi('/solana')
app.use(
  cors({
    origin: (origin, c) => (getCorsOrigins(c)?.includes(origin) ? origin : null),
  }),
)

app.get('/', (c) => {
  return c.text('hono-cloudflare-workers-solana-gill')
})

app.route(solanaApi.prefix, solanaApi.app)

export default app
