import { TemplatesResult } from './get-templates'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'

export interface TemplatesDotJson {
  templates: string[]
}

export async function lintTemplatesDotJson({ templatesDir, templates }: Omit<TemplatesResult, 'directory'> & {}) {
  const content: TemplatesDotJson = { templates: templates.sort() }
  const templatesJsonPath = join(templatesDir, 'templates.json')

  if (!existsSync(templatesJsonPath)) {
    console.log(`templates.json not found in ${templatesDir}`)
    await writeTemplatesDotJson(templatesJsonPath, content)
    return
  }

  const templatesJson: TemplatesDotJson = JSON.parse(await readFile(templatesJsonPath, 'utf-8'))

  if (!Array.isArray(templatesJson?.templates)) {
    console.log(`templates.json is not an array, overwriting with ${templates.length} templates`)
    await writeTemplatesDotJson(templatesJsonPath, content)
    return
  }

  const existingTemplates = new Set(templatesJson.templates)
  const isEqual =
    existingTemplates.size === templates.length && [...existingTemplates].every((t) => templates.includes(t))
  if (isEqual) {
    console.log(`templates.json is equal to ${templates.length} templates, no changes`)
    return
  }
  console.log(
    `templates.json is not equal to ${templates.length} templates, overwriting with ${templates.length} templates`,
  )
  await writeTemplatesDotJson(templatesJsonPath, content)
}

function writeTemplatesDotJson(path: string, content: TemplatesDotJson) {
  return writeFile(path, JSON.stringify(content, null, 2) + '\n')
}
