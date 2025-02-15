import { Context } from '../lib'
import prompts from 'prompts'
import { Command } from './command'
import { address, assertIsAddress } from 'gill'

let previousPublicKey: string | undefined

export const commandBalance: Command = {
  name: 'balance',
  description: 'Get the balance for a public key',
  action: async (ctx: Context) => {
    const { publicKey } = await prompts({
      type: 'text',
      name: 'publicKey',
      message: 'Enter a public key',
      initial: previousPublicKey,
      validate: (publicKey) => {
        try {
          assertIsAddress(publicKey)
          return true
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error: unknown) {
          return false
        }
      },
    })
    if (publicKey !== previousPublicKey) {
      previousPublicKey = publicKey
    }
    try {
      const balance = await ctx.client.rpc
        .getBalance(address(publicKey))
        .send()
        .then((res) => Number(res.value))

      return [null, `${balance / 10 ** 9} SOL`]
    } catch (error: string | unknown) {
      return [new Error(`${error}`), null]
    }
  },
}
