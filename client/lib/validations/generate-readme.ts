import * as z from 'zod';

export const GenerateReadmeSchema = z.object({
  project_description: z.string(),
  project_type: z.enum(['java', 'python']),
  repositoryName: z.string(),
});
