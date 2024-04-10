import * as z from 'zod';

export const DependencyCheckerSchema = z.object({
  project_type: z.enum(['java', 'python']),
  repositoryName: z.string(),
});
