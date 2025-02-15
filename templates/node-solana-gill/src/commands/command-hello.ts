import { Command } from './command'
import prompts from 'prompts'
import pico from 'picocolors'

export const commandHello: Command = {
  name: 'hello',
  description: 'Say hello',
  action: async () => {
    try {
      const { name } = await prompts({
        type: 'text',
        name: 'name',
        message: "What's your name?",
        validate: (name) => name.length > 0,
      })

      return [null, pico.blue(`Hello ${pico.green(name)}!`)]
    } catch (error: string | unknown) {
      return [new Error(`${error}`), null]
    }
  },
}
