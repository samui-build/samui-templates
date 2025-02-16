import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import 'dotenv/config';
import { getCorsOrigins } from './lib/get-cors-origins.js';
import { createSolanaApi } from './solana-api.js';
const app = new Hono();
const solanaApi = createSolanaApi('/solana');
app.use(cors({
    origin: (origin, c) => (getCorsOrigins(c)?.includes(origin) ? origin : null),
}));
app.get('/', (c) => {
    return c.text('hono-node-solana-gill');
});
app.route(solanaApi.prefix, solanaApi.app);
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);
serve({
    fetch: app.fetch,
    port,
});
