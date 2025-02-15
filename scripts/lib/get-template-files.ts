import { getTemplateFile } from './get-template-file'

export async function getTemplateFiles(files: string[]): Promise<Map<string, string>> {
  const rootTemplates = new Map<string, string>()
  for (const file of files) {
    const rootTemplate = await getTemplateFile(file)
    rootTemplates.set(file, rootTemplate)
  }
  return rootTemplates
}
