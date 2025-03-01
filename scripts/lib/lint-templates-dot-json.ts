import { TemplatesResult } from './get-templates'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'

export interface TemplatesDotJson {
  templates: TemplateDetails[]
}

export interface TemplateDetails {
  name: string
  description: string
}

export async function lintTemplatesDotJson({ templatesDir, templates }: Omit<TemplatesResult, 'directory'> & {}) {
  const details = await getTemplatesDetails(templatesDir, templates.sort())
  console.log(`linting templates.json in ${templatesDir}`, templates, details)
  const content: TemplatesDotJson = { templates: details }
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

  const existingTemplateNames = new Set(templatesJson.templates.map((t) => t.name))
  const isEqual =
    existingTemplateNames.size === templates.length && [...existingTemplateNames].every((t) => templates.includes(t))
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

async function getTemplatesDetails(templatesDir: string, templates: string[]) {
  const details: TemplateDetails[] = []
  for (const template of templates) {
    const path = join(templatesDir, template)
    details.push(await getTemplateDetails(path))
  }
  return details
}

async function getTemplateDetails(path: string) {
  // Read the package json file
  const packageJsonPath = join(path, 'package.json')
  if (!existsSync(packageJsonPath)) {
    throw new Error(`package.json not found in ${path}`)
  }
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

  return {
    name: packageJson.name,
    description: packageJson.description,
  }
}
