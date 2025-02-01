'use client';

import CustomBreadcrumb from '@/components/common/bread-crumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { dashboardRoutes } from '@/lib/routes';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import TextInput from '@/components/common/text-input';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useMemo, useState } from 'react';
import dynamic from "next/dynamic";

const categories = [
  { value: 'AI', label: 'Artificial Intelligence' },
  { value: 'WebDev', label: 'Web Development' },
  { value: 'Blockchain', label: 'Blockchain' },
];

const skills = [
  { value: 'js', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
];

const seniorityLevels = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
];

const formSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  projectBrief: z
    .string()
    .min(10, { message: 'Project brief must be at least 10 characters.' }),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters.' }),
  challengeCategory: z
    .string()
    .min(1, { message: 'Please select a category.' }),
  moneyPrize: z.string().min(1, { message: 'Enter a valid prize amount.' }),
  submissionLink: z.string().url({ message: 'Enter a valid URL.' }),
  deadline: z.string().min(1, { message: 'Deadline is required.' }),
  startDate: z.string().min(1, { message: 'Start date is required.' }),
  contactEmail: z.string().email({ message: 'Enter a valid email.' }),
  skillsNeeded: z.string().min(1, { message: 'Select at least one skill.' }),
  seniorityLevel: z
    .string()
    .min(1, { message: 'Please select a seniority level.' }),
});

const CreateChallengePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      projectBrief: '',
      description: '',
      challengeCategory: '',
      moneyPrize: '',
      submissionLink: '',
      deadline: '',
      startDate: '',
      contactEmail: '',
      skillsNeeded: '',
      seniorityLevel: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensure it's only run on the client side
  }, []);
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
  return (
    <div className="">
      <CustomBreadcrumb
        items={[
          {
            label: 'Challenges & Hackathons',
            href: dashboardRoutes.challengeHackathons.path,
          },
          { label: dashboardRoutes.challengeHackathons.new.label },
        ]}
      />
      <Card className="md:w-3/5 mx-auto p-6 my-10">
        <h1 className="text-xl font-bold text-center">Create New Challenge</h1>
        <p className="text-primary_grey text-center my-2">
          Fill out these details to create your challenge
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-10"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge/Hackhaton Title</FormLabel>
                  <FormControl>
                    <Input
                      className="h-12"
                      placeholder="Enter Title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex max-w-screen-sm:flex-wrap gap-5 w-full">
              <TextInput
                className="w-full"
                form={form}
                name="startDate"
                label="Start Date"
                type="date"
              />
              <TextInput
                className="w-full"
                form={form}
                name="deadline"
                label="Deadline"
                type="date"
              />
            </div>

            <div className="flex max-w-screen-sm:flex-wrap gap-5 w-full">
              <TextInput
                form={form}
                name="moneyPrize"
                label="Money Prize ($)"
                type="number"
              />
              <TextInput
                form={form}
                name="contactEmail"
                label="Contact Email"
                type="email"
                placeholder="contact@example.com"
              />
            </div>

            {/* Project Brief */}
            <FormField
              control={form.control}
              name="projectBrief"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Brief</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief about the project"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description (Rich Text Editor) */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full gap-5 items-center">
              <FormField
                control={form.control}
                name="challengeCategory"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Challenge Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <TextInput
                form={form}
                name="submissionLink"
                label="Submission Link"
                type="url"
                placeholder="https://submission.com"
              />
            </div>

            {/* Skills Needed */}
            <FormField
              control={form.control}
              name="skillsNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills Needed</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    // defaultValue={field.value}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select skills needed" />
                    </SelectTrigger>
                    <SelectContent>
                      {skills.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Seniority Level */}
            <FormField
              control={form.control}
              name="seniorityLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seniority Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select a seniority level" />
                    </SelectTrigger>
                    <SelectContent>
                      {seniorityLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex gap-5 py-5">
              <Button className="w-1/3 h-12" variant="outline" type="submit">
                Cancel
              </Button>
              <Button className="w-2/3 h-12" type="submit">
                Create Challenge
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreateChallengePage;
