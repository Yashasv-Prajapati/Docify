import * as z from 'zod';

export const GenerateTestingPlanSchema = z.object({
  project_id: z.string(),
  project_description: z.string(),
});
