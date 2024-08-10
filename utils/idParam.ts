import { z } from 'zod'

export const idParamSchema = z.object({
  id: z.string().uuid(),
})

export type IdParamSchema = z.infer<typeof idParamSchema>
