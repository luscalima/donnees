import { z } from 'zod'

export const projectSchema = z.object({
  id: z.string().optional(), // TODO: add proper validation for uuid
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional(),
})

export type ProjectSchema = z.infer<typeof projectSchema>
