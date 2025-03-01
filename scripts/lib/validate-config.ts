import { z } from 'zod'

// Define the group schema
export const GroupSchema = z.object({
  name: z.string(),
  description: z.string(),
  matchers: z.array(z.string()),
})

// Define the template configuration schema
export const TemplateConfigSchema = z.object({
  name: z.string(),
  templates: z.string(),
  groups: z.array(GroupSchema),
})

// Define the complete schema with required "default" key
// and any additional keys following the same structure
export const ConfigSchema = z
  .object({
    default: TemplateConfigSchema,
  })
  .catchall(TemplateConfigSchema)
  .superRefine((data, ctx) => {
    if (!('default' in data)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Configuration must include a 'default' template configuration",
        path: ['default'],
      })
    }
  })

// Type inference
export type Group = z.infer<typeof GroupSchema>
export type TemplateConfig = z.infer<typeof TemplateConfigSchema>
export type Config = z.infer<typeof ConfigSchema>
