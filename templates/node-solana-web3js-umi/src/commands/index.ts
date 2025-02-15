import { Command } from './command'
import { commandBalance } from './command-balance'
import { commandGenesisHash } from './command-genesis-hash'
import { commandHello } from './command-hello'
import { commandHelp } from './command-help'

export const commands: Record<string, Command> = {
  balance: commandBalance,
  'genesis-hash': commandGenesisHash,
  hello: commandHello,
  help: commandHelp,
}
