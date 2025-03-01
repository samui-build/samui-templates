import { readFile } from 'node:fs/promises'
import { ConfigSchema } from './lib/validate-config'

const configData = JSON.parse(await readFile('config.json', 'utf8'))

// Parse and validate
try {
  const validatedConfig = ConfigSchema.parse(configData)
  console.log('Config is valid!', JSON.stringify(validatedConfig, null, 2))
} catch (error) {
  console.error('Config validation failed:', error)
}

console.log('Done')
