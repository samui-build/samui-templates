import 'dotenv/config'
import express from 'express'
import { getContext } from './lib/index.js'
import { address as addressFn, assertIsAddress } from 'gill'

const app = express()
const port = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.send('node-express-solana-gill')
})

app.get('/balance/:address', async (req, res) => {
  const { client } = getContext()
  const address = addressFn(req.params.address)
  assertIsAddress(address)
  const balance = await client.rpc
    .getBalance(address)
    .send()
    .then((res) => res.value.toString())
  res.send(balance)
})

app.get('/genesis-hash', async (req, res) => {
  const { client } = getContext()
  const genesisHash = await client.rpc
    .getGenesisHash()
    .send()
    .then((res) => res.toString())
  res.send(genesisHash)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
