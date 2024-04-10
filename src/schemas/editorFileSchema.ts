import { z } from "zod";

export const editorFileSchema = z.object({
  version: z.string(),
  nodes: z.array(
    z.object({
      id: z.string(),
      data: z.object({})
    })
  ),
  edges: z.array(
    z.object({
      id: z.string(),
      data: z.object({})
    })
  )
});