'use client';
import { FC , useState} from 'react';
import ProjectCard from '@/app/dashboard/components/project-card';
import Search from '@/app/dashboard/components/search';


type ImportedProjectsParams = {
    imported_projects: any;
}
const ImportedProjects: FC<ImportedProjectsParams> = ({imported_projects}) => {
    const [filteredProjects, setFilteredProjects] = useState(imported_projects as any[]);
    const handleFilteredData = (data: any) => {
        setFilteredProjects(data);
    }
    return (
        <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10'>
        <div className='mx-auto grid w-full max-w-6xl gap-2'>
          <h1 className='text-3xl font-semibold'>Projects</h1>
        </div>
        <div className='mx-auto grid w-full max-w-6xl gap-6'>
          <Search data={imported_projects} onfilteredData={handleFilteredData}/>
          <div className='grid gap-4 overflow-hidden rounded-lg border lg:gap-px lg:bg-gray-100'>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.projectId}
                url={project.url}
                repository_name={project.repository_name}
                testing_dir={project.testing_dir}
              />
            ))}
          </div>
        </div>
      </main>
    )
}

export default ImportedProjects;