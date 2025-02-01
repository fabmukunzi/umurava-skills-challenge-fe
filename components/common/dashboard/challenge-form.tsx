import { useMemo } from 'react';
import dynamic from 'next/dynamic';
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
import {
  challengeFormSchema,
  ChallengeFormData,
} from '@/lib/challenge-form-validation';
import 'react-quill/dist/quill.snow.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { DateInput } from '@/components/common/date-input';
import TextInput from '@/components/common/text-input';
import SelectInput from '@/components/common/select-box';
import { Textarea } from '@/components/ui/textarea';

const ChallengeForm = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}: {
  onSubmit: (values: ChallengeFormData) => void;
  defaultValues: ChallengeFormData;
  isEdit?: boolean;
}) => {
  const form = useForm<ChallengeFormData>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues,
  });

  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );

  const categories = [
    { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Blockchain', label: 'Blockchain' },
  ];

  const skills = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'UI/UX Design', label: 'UI/UX Design' },
    { value: 'User Research', label: 'User Research' },
  ];

  const seniorityLevels = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Senior', label: 'Senior' },
  ];

  return (
    <Card className="md:w-3/5 mx-auto p-6 my-10">
      <h1 className="text-2xl font-bold text-center">
        {isEdit ? 'Edit Challenge' : 'Create New Challenge'}
      </h1>
      <p className='text-center text-primary_grey'>Fill out these details to build your broadcast</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-10"
        >
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

          <div className="flex  flex-wrap md:flex-nowrap gap-5 w-full">
            <div className="flex flex-wrap md:flex-nowrap justify-between gap-5 w-full">
              <DateInput
                form={form}
                placeHolder="Select start date"
                name="startDate"
                label="Start Date"
              />
              <DateInput
                form={form}
                placeHolder="Select deadline date"
                name="deadline"
                label="Deadline"
              />
            </div>
          </div>

          <div className="flex  flex-wrap md:flex-nowrap gap-5 w-full">
            <TextInput
              form={form}
              name="moneyPrize"
              label="Money Prize ($)"
              type="text"
            />
            <TextInput
              form={form}
              name="contactEmail"
              label="Contact Email"
              type="email"
              placeholder="contact@example.com"
            />
          </div>
          <FormField
            control={form.control}
            name="projectBrief"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Brief</FormLabel>
                <FormControl>
                  <Textarea placeholder="Brief about the project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <div className="flex w-full flex-wrap md:flex-nowrap gap-5 items-center">
            <SelectInput
              form={form}
              name="challengeCategory"
              label="Challenge Category"
              placeholder="Select a category"
              options={categories}
            />

            <TextInput
              form={form}
              name="submissionLink"
              label="Submission Link"
              type="url"
              placeholder="https://submission.com"
            />
          </div>
          <SelectInput
            form={form}
            name="skillsNeeded"
            label="Skills Needed"
            placeholder="Select skills needed"
            options={skills}
            multi={true}
          />
          <SelectInput
            form={form}
            name="seniorityLevel"
            label="Seniority Level"
            placeholder="Select seniority level"
            options={seniorityLevels}
            multi={true}
          />

          <div className="w-full flex gap-5 py-5">
            <Button className="w-5/12 h-12" variant="outline" type="button">
              Cancel
            </Button>
            <Button className="w-7/12 h-12" type="submit">
              {isEdit ? 'Update Challenge' : 'Create Challenge'}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ChallengeForm;
