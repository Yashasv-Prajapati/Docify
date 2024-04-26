import { db } from '@/lib/db';

export async function update_project_branch(
  projectId: string,
  branch_name: string,
  feature: string
) {
  if (feature.toLowerCase() == 'uml') {
    await db.project.update({
      where: {
        projectId: projectId,
      },
      data: {
        uml_latest_branch: branch_name,
      },
    });
    return {status:200};
  }

  if (feature.toLowerCase() == 'code_coverage') {
    await db.project.update({
      where: {
        projectId: projectId,
      },
      data: {
        coverage_latest_branch: branch_name,
      },
    });
    return {status:200};
  }

  if (feature.toLowerCase() == 'dependency_checker') {
    await db.project.update({
      where: {
        projectId: projectId,
      },
      data: {
        dependency_latest_branch: branch_name,
      },
    });
    return {status:200};
  }

  return {status:400};
}


export async function get_project_branch(projectId:string, feature:string): Promise<string | null>{

  const project = await db.project.findUnique({
    where: {
      projectId: projectId,
    },
    select:{
      uml_latest_branch:true,
      coverage_latest_branch:true,
      dependency_latest_branch:true
    }
  });

  if(!project){
    return null;
  }

  if (feature.toLowerCase() == 'uml') {
    return project.uml_latest_branch;
  }

  if (feature.toLowerCase() == 'code_coverage') {
    return project.coverage_latest_branch;
  }

  if (feature.toLowerCase() == 'dependency_checker') {
    return project.dependency_latest_branch;
  }

  return null;
}