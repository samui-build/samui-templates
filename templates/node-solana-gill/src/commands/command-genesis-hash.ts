import { Command } from './command'
import { Context } from '../lib'

export const commandGenesisHash: Command = {
  name: 'genesis-hash',
  description: 'Get the genesis hash',
  action: async (ctx: Context) => {
    try {
      const genesisHash = await ctx.client.rpc
        .getGenesisHash()
        .send()
        .then((res) => res.toString())

      return [null, genesisHash]
    } catch (error: string | unknown) {
      return [new Error(`${error}`), null]
    }
  },
}
