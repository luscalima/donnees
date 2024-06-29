import { z } from "zod";

export const modelSchema = z.object({
  projectId: z.coerce.number(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  type: z.enum(["erd", "relational"]).default("erd"),
  description: z.string().optional(),
});

export type ModelSchema = z.infer<typeof modelSchema>;
