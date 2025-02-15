import { Context } from '../lib/get-context'
import prompts from 'prompts'
import { ensureValidPublicKey } from '../lib/ensure-valid-public-key'

import { Command } from './command'

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
          ensureValidPublicKey(publicKey)
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
      const address = ensureValidPublicKey(publicKey)
      const balance = await ctx.connection.getBalance(address)

      return [null, `${balance / 10 ** 9} SOL`]
    } catch (error: string | unknown) {
      return [new Error(`${error}`), null]
    }
  },
}
