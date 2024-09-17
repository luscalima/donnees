import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string().optional(), // TODO: add proper validation for uuid
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(60, 'Name must be at most 60 characters'),
  description: z
    .string()
    .max(1000, 'Description must be at most 1000 characters')
    .optional(),
})

export type ProjectSchema = z.infer<typeof projectSchema>
