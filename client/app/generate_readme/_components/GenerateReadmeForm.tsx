'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react"; // Import useState hook for managing form data and API request

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Wrapper from "@/components/wrapper";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
// Define the formSchema for form data validation
const formSchema = z.object({
  description: z.string().min(1),
});

interface FormData {
  projectType: string;
  repositoryName: string;
  description: string;
}

interface Project {
  project_type: string;
  repository_name: string;
}

interface Props {
  project: Project;
}

export default function GenerateReadmeForm({ project = {project_type: "python", repository_name: "The-arcade-game"}}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        projectType: project.project_type,  
        repositoryName: project.repository_name,
        description: ''
    },
  });

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log("Generating Readme...");
      // Send request to API handler to generate readme
      const response = await fetch('/api/generate-readme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate readme');
      }

      console.log('Readme generated successfully');
    } catch (error) {
      // console.error('Error generating readme:', error?.message);
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
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <FormControl>
                      <Input value={project.project_type} disabled className="border border-gray-300" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repositoryName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository Name</FormLabel>
                    <FormControl>
                      <Input value={project.repository_name} disabled className="border border-gray-300" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <textarea placeholder="Enter project description" {...field} className="w-full h-32 p-2 resize-none border border-gray-300" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Generate</Button>
            </form>
          </Form>
          </CardContent>
        </Card>
    
    </div>
      
    </Wrapper>
  );
}
