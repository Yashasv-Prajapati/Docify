import * as z from 'zod';

export const UMLSchema = z.object({
  github_access_token: z.string(),
  github_username: z.string(),
  github_repo_name: z.string(),
  project_type: z.string(),
  projectId: z.string(),
  folderPath: z.string(),
});

// export const UMLSchema = z.object({
//   token: z.string(),
//   username: z.string(),
//   repo: z.string(),
//   type: z.string(),
//   projectId: z.string(),
//   folderPath: z.string(),
// });