import { Context } from '../lib'

export type Command = {
  name: string
  description: string
  action: (ctx: Context) => Promise<[Error | null, string | object | null | void]>
}
