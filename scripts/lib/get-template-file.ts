import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile } from 'node:fs/promises'

export async function getTemplateFile(filename: string): Promise<string> {
  const templatePath = join(process.cwd(), filename)
  if (!existsSync(templatePath)) {
    console.log(`getTemplateFile: ${templatePath} not found`)
    throw new Error(`getTemplateFile: ${templatePath} not found`)
  }
  const content = await readFile(templatePath, 'utf-8')
  if (!content.trim()) {
    console.log(`getTemplateFile: ${templatePath} is empty`)
    throw new Error(`getTemplateFile: ${templatePath} is empty`)
  }
  return content
}
