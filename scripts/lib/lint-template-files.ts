import { TemplatesResult } from './get-templates'
import { join } from 'node:path'
import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { getTemplateFiles } from './get-template-files'

export async function lintTemplateFiles({
  templatesDir,
  templates,
  files,
}: Omit<TemplatesResult, 'directory'> & {
  files: string[]
}) {
  console.log(`lintTemplateFiles: ${templatesDir}`)
  // Load in the root templates
  const templateFiles = await getTemplateFiles(files)

  let count = 0
  for (const template of templates) {
    const templatePath = join(templatesDir, template)
    if (!existsSync(templatePath)) {
      console.log(`  ${templatePath} not found`)
      continue
    }
    // Now loop over the root templates and see if the content matches
    for (const [file, rootTemplate] of templateFiles) {
      const filePath = join(templatePath, file)
      if (!existsSync(filePath)) {
        console.log(`  ${filePath} not found, creating...`)
        count++
        await writeFile(filePath, rootTemplate)
        continue
      }
      const content = await readFile(filePath, 'utf-8')
      if (content.trim() !== rootTemplate.trim()) {
        console.log(`  ${filePath} does not match root template, updating...`)
        count++
        await writeFile(filePath, rootTemplate)
      }
    }
  }
  if (count > 0) {
    console.log(`Updated ${count} files`)
  }
}
