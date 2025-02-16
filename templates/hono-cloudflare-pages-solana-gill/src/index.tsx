import { Hono } from 'hono'
import { renderer } from './renderer'
import { cors } from 'hono/cors'
import { createSolanaApi } from './solana-api.js'
import { getCorsOrigins } from './lib/get-cors-origins.js'

const app = new Hono()

const solanaApi = createSolanaApi('/solana')

app.use(
  cors({
    origin: (origin, c) => (getCorsOrigins(c)?.includes(origin) ? origin : null),
  }),
)

app.use(renderer)

app.get('/', (c) => {
  // TODO: Add a form that takes an address and fetches the balance
  return c.render(
    <div>
      <h1>hono-cloudflare-pages-solana-gill</h1>
    </div>,
  )
})

app.route(solanaApi.prefix, solanaApi.app)

export default app
