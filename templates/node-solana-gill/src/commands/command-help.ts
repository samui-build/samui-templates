import { Command } from './command'
import pico from 'picocolors'

export const commandHelp: Command = {
  name: 'help',
  description: 'Show help',
  action: async () => {
    return [null, pico.yellow(`I'm not helpful but you could add some help here.`)]
  },
}
