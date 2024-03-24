import { z } from "zod";

export const editorFileSchema = z.object({
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