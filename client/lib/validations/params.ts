import * as z from 'zod';

export const searchParamsSchema = z.object({
  search: z.string().default(''),
});
