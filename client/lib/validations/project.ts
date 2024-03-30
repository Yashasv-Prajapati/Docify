import * as z from 'zod';

export const createProjectSchema = z.object({
  url: z.string(),
  repository_name: z.string(),
  userId: z.string(),
  testing_dir: z.string(),
  project_type: z.union([z.literal('java'), z.literal('python')]),
});
