import prompts from 'prompts'
import pico from 'picocolors'
import { commands } from './commands'
import { getContext } from './lib/get-context'

while (true) {
  const context = getContext()
  const { selected } = await prompts({
    type: 'select',
    name: 'selected',
    message: 'Choose an option:',
    choices: [
      ...Object.keys(commands).map((key) => {
        const command = commands[key]
        return { title: command.name, description: command.description, value: key }
      }),
      { title: 'quit', value: 'quit', description: 'Quit this script' },
    ],
  })

  if (!selected) {
    console.log(pico.red('No command selected.'))
    continue
  }

  if (selected === 'quit') {
    console.log(pico.yellow('Bye now!'))
    process.exit(0)
  }

  const command = commands[selected]
  if (!command) {
    console.log(pico.red(`Command ${pico.yellow(selected)} not found.`))
    process.exit(1)
  }

  const [error, result] = await command.action(context)
  if (error) {
    console.log(pico.red(`  Error: ${pico.red(error.message)}`))
  }
  if (result) {
    console.log(
      pico.gray(`  Result: ${pico.magenta(typeof result === 'string' ? result : JSON.stringify(result, null, 2))}`),
    )
  }
}
