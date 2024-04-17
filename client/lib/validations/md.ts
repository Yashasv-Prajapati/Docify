import * as z from 'zod';

export const MarkdownFileSchema = z.object({
  content: z.string(),
  authorId: z.string(),
  projectId: z.string(),
});

export const CoverageToMdSchema = z.object({
  htmlStr: z.string(),
});
