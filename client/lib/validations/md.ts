import * as z from 'zod';

export const MarkdownFileSchema = z.object({
  content: z.string(),
  authorId: z.string(),
  projectId: z.string().url(),
});
