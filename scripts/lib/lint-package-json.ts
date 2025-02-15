import { TemplatesResult } from './get-templates'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'

export async function lintPackageJson({
  templatesDir,
  templates,
  expected,
}: TemplatesResult & {
  expected: Record<string, string>
}) {
  console.log(`lintPackageJson: ${templatesDir}`)

  let count = 0
  for (const template of templates) {
    const templatePath = join(templatesDir, template)
    if (!existsSync(templatePath)) {
      console.log(`  ${templatePath} not found`)
      continue
    }
    // Make sure the package.json file exists and the name property matches the template name. If not, update it.
    const packageJsonPath = join(templatePath, 'package.json')
    if (!existsSync(packageJsonPath)) {
      console.log(`  ${packageJsonPath} not found, creating...`)
      count++
      await writeFile(packageJsonPath, JSON.stringify({ name: template }, null, 2))
      continue
    }
    const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8'))

    // Check for all the expected properties
    for (const [key, rawValue] of Object.entries(expected)) {
      const value = rawValue.replace('{{templateName}}', template)

      if (packageJson[key] !== value) {
        const updatedContent = JSON.stringify({ ...packageJson, [key]: value }, null, 2) + '\n'
        console.log(
          `  ${packageJsonPath.replace(templatesDir, './templates')} does not match root template, updating ${key} from ${packageJson[key]} to ${value}...`,
        )
        count++
        await writeFile(packageJsonPath, updatedContent)
      }
    }
  }
  if (count > 0) {
    console.log(`Updated ${count} files`)
  }
}
