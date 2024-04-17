'use client';

import { useState } from 'react'; // Import useState hook for managing form data and API request
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Wrapper from '@/components/wrapper';

// Define the formSchema for form data validation
const formSchema = z.object({
  projectType: z.string().min(1),
  description: z.string().min(1),
  repositoryName: z.string().min(1),
});
interface FormData {
  projectType: string;
  repositoryName: string;
  description: string;
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
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: project.project_type,
      repositoryName: project.repository_name,
      description: '',
    },
  });

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    try {
      console.log('Generating Readme...');

      const body = GenerateReadmeSchema.parse({
        project_description: values.description,
        project_type: values.projectType,
        repositoryName: values.repositoryName,
      });
      // Send request to API handler to generate readme
      const { data } = await axios.post('/api/generate-readme', body);

      console.log('Generated README: ', data);
      console.log('Readme generated successfully');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error generating readme:', error?.message);
      }
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
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder='Enter project description'
                          {...field}
                          className='h-32 w-full resize-none border border-gray-300 p-2'
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type='submit'>Generate</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Wrapper>
  );
}
