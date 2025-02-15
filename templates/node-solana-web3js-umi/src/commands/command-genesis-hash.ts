import { Command } from './command'
import { Context } from '../lib/get-context'

export const commandGenesisHash: Command = {
  name: 'genesis-hash',
  description: 'Get the genesis hash',
  action: async (ctx: Context) => {
    try {
      const genesisHash = await ctx.connection.getGenesisHash()

      return [null, genesisHash]
    } catch (error: string | unknown) {
      return [new Error(`${error}`), null]
    }
  },
}
