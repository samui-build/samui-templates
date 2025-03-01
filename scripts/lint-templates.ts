import { getTemplates, lintPackageJson, lintTemplateFiles } from './lib'
import { lintTemplatesDotJson } from './lib/lint-templates-dot-json'

const directory = process.argv[2]

if (!directory) {
  console.log('Usage: esrun ./scripts/lint-templates.ts <directory>')
  process.exit(1)
}

if (directory !== 'templates') {
  console.log(`Running in ${directory} directory`)
}

const { templates, templatesDir } = await getTemplates(directory)

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
  expectedProperties: {
    name: '{{templateName}}',
    version: '1.0.0',
    license: 'MIT',
  },
  expectedScripts: ['build', 'ci', 'dev'],
  templates,
  templatesDir,
})

await lintTemplatesDotJson({ templates, templatesDir })

console.log('Done')
