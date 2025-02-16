import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'

export interface TemplatesResult {
  directory: string
  templatesDir: string
  templates: string[]
}

export async function getTemplates(directory: string): Promise<TemplatesResult> {
  const pwd = process.cwd()
  const templatesDir = join(pwd, directory)

  if (!existsSync(templatesDir)) {
    throw new Error(`Directory ${directory} not found`)
  }

  const templates = await readdir(templatesDir)
    // Filter out json files
    .then((files) => files.filter((file) => !file.endsWith('.json')))

  if (!templates.length) {
    console.warn('No templates found')
  }
  return {
    directory,
    templatesDir,
    templates: templates.sort(),
  }
}
