import * as z from 'zod';

export const searchParamsSchema = z.object({
  search: z.string().default(''),
});

export const searchParamsEditorSchema = z.object({
  repo: z.string().default(''),
  content: z.string().default(''),
});
