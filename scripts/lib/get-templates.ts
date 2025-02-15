import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readdir } from 'node:fs/promises'

export interface TemplatesResult {
  templatesDir: string
  templates: string[]
}

export async function getTemplates(): Promise<TemplatesResult> {
  const pwd = process.cwd()
  const templatesDir = join(pwd, 'templates')

  if (!existsSync(templatesDir)) {
    throw new Error('templates folder not found')
  }

  const templates = await readdir(templatesDir)

  if (!templates.length) {
    console.warn('No templates found')
  }
  return {
    templatesDir,
    templates: templates.sort(),
  }
}
