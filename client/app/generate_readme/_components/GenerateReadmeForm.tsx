'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { GenerateReadmeSchema } from '@/lib/validations/generate-readme';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Wrapper from '@/components/wrapper';

// Define the formSchema for form data validation
const formSchema = z.object({
  projectType: z.string().min(1),
  repositoryName: z.string().min(1),
  core_functionalities: z.string().min(1),
  project_goals: z.string().min(1),
});
interface FormData {
  projectType: string;
  repositoryName: string;
  core_functionalities: string;
  project_goals: string;
}

interface Project {
  projectId: string;
  url: string;
  repository_name: string;
  userId: string;
  testing_dir: string;
  project_type: string;
}

interface Props {
  project: Project;
}

export default function GenerateReadmeForm({ project }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: project.project_type,
      repositoryName: project.repository_name,
      core_functionalities: '',
      project_goals: '',
    },
  });

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log('Generating Readme...');

      const body = GenerateReadmeSchema.parse({
        core_functionalities: values.core_functionalities,
        project_goals: values.project_goals,
        project_type: values.projectType,
        repositoryName: values.repositoryName,
      });
      // Send request to API handler to generate readme
      const { data } = await axios.post('/api/generate-readme', body);

      console.log('Generated README: ', data);
      console.log('Readme generated successfully');

      router.push(
        `/editor?repo=${project.repository_name}&content=${encodeURIComponent(data.readme)}`
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error generating readme:', error?.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Wrapper className='mx-auto'>
      <div className='m-5 mx-auto '>
        <Card className='mx-auto w-5/6 '>
          <CardHeader>
            <CardTitle>Generate Readme</CardTitle>
            <CardDescription>
              Provide a basic description of your project to generate a readme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='projectType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <FormControl>
                        <Input
                          value={project.project_type.toUpperCase()}
                          disabled
                          className='border border-gray-300'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='repositoryName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repository Name</FormLabel>
                      <FormControl>
                        <Input
                          value={project.repository_name}
                          disabled
                          className='border border-gray-300'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='project_goals'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brief Description of the project goals and objectives
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder='Build a software that...'
                          {...field}
                          className='h-32 w-full resize-none border border-gray-300 p-2'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='core_functionalities'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brief description of the core features and
                        functionalities of the project
                      </FormLabel>
                      <FormControl>
                        <textarea
                          placeholder='Easing the process of...'
                          {...field}
                          className='h-32 w-full resize-none border border-gray-300 p-2'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Generate'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
}
