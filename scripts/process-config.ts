import { readFile } from 'node:fs/promises'
import { Config, ConfigSchema, TemplateConfig } from './lib/validate-config'
import fs from 'fs/promises'
import { join, relative } from 'node:path'

const configData = JSON.parse(await readFile(join(process.cwd(), 'config.json'), 'utf8'))

// Parse and validate
const config: Config = ConfigSchema.parse(configData)

interface Template {
  name: string
  description: string
  repository?: string
}

interface ProcessedConfig {
  [key: string]: {
    id: string
    name: string
    templates: string
    groups: {
      id: string
      title: string
      description: string
      templates: Template[]
    }[]
  }
}

// Process the config
const processedConfig: ProcessedConfig = {}

for (const key in config) {
  const templateConfig: TemplateConfig = config[key]
  console.log(`Processing templates in ${key}...`)

  // Read the templates file
  const templatesPath = join(process.cwd(), templateConfig.templates)
  const templatesData = JSON.parse(await fs.readFile(templatesPath, 'utf-8'))
  const templates: Template[] = templatesData.templates

  if (config.hasOwnProperty(key)) {
    const configItem = config[key]
    const groups = configItem.groups.map((group) => {
      const matchedTemplates = templates.filter((template) =>
        group.matchers.some((matcher) => template.name.startsWith(matcher.replace('*', ''))),
      )
      return {
        ...group,
        templates: matchedTemplates,
        matchers: undefined, // Remove matchers from the output
      }
    })

    processedConfig[key] = {
      ...configItem,
      groups,
    }
  }
}

// Write the output file
const outputPath = join(process.cwd(), 'registry.json')
await fs.writeFile(outputPath, JSON.stringify(processedConfig, null, 2) + '\n', 'utf-8')

console.log(`Processing complete. Output written to ${relative(process.cwd(), outputPath)}.`)
