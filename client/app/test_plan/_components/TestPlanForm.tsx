'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
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
  project_description: z.string().min(1),
});
interface FormData {
  projectType: string;
  repositoryName: string;
  project_description: string;
}



const TestPlanSchema = z.object({
    project_description: z.string(),
    project_id: z.string(),
  });
  

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

export default function TestPlanForm({ project }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: project.project_type,
      repositoryName: project.repository_name,
      project_description: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {

      console.log('Generating Test Plan...');

      const body = TestPlanSchema.parse({
        project_id: project.projectId,
        project_description: values.project_description,
      });
      // Send request to API handler to generate readme
      const { data } = await axios.post('/api/test_plan/generate', body);

      console.log('Generated Test Plan: ', data);
      console.log('Test Plan successfully');

      router.push(
        `/dashboard`
      );
    } catch (error) {
      toast.error('Something went wrong! Sorry 😔');

      if (error instanceof Error) {
        console.error('Error in testing plan:', error?.message);
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
            <CardTitle>Test Plan</CardTitle>
            <CardDescription>
              Provide a basic description of your project to generate a Test Plan
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
                  name='project_description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Brief Description of the project.
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
                {/* <FormField
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
                /> */}
                <Button type='submit' size='lg' disabled={isLoading}>
                  {isLoading ? 'Generating...' : 'Generate'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
}
