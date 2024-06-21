import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
});

export type ProjectSchema = z.infer<typeof projectSchema>;
