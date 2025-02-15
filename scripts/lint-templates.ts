import { getTemplates, lintPackageJson, lintTemplateFiles } from './lib'

const { templates, templatesDir } = await getTemplates()

console.log(
  `Found ${templates.length} templates in "${templatesDir.replace(process.cwd(), '.')}"`,
  JSON.stringify(templates, null, 2),
)

await lintTemplateFiles({
  // These files in the root are synced across all templates
  files: ['.prettierignore', '.prettierrc', 'LICENSE'],
  templates,
  templatesDir,
})

await lintPackageJson({
  // These are the expected properties in the package.json file
  expected: {
    name: '{{templateName}}',
    version: '1.0.0',
    license: 'MIT',
  },
  templates,
  templatesDir,
})

console.log('Done')
