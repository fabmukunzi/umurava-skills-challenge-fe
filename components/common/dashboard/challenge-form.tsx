'use client';

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
import { challengeFormSchema } from '@/lib/challenge-form-validation';
import 'react-quill/dist/quill.snow.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { DateInput } from '@/components/common/date-input';
import TextInput from '@/components/common/text-input';
import SelectInput from '@/components/common/select-box';
import { CreateChallengeDto } from '@/store/actions/challenge';
import {
  useGetCategoriesQuery,
} from '@/store/actions/categories';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { dashboardRoutes } from '@/lib/routes';
import { IPrizeCategory } from '@/lib/types/setting';
import { useGetSkillsQuery } from '@/store/actions/setting';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface ChallengeFormProps {
  onSubmit: SubmitHandler<CreateChallengeDto>;
  defaultValues: CreateChallengeDto;
  isEdit?: boolean;
  isSubmitting?: boolean;
  prizesData: IPrizeCategory[];
}

const ChallengeForm = ({
  onSubmit,
  defaultValues,
  isEdit = false,
  isSubmitting = false,
  prizesData,
}: ChallengeFormProps) => {
  const form = useForm<CreateChallengeDto>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      ...defaultValues,
      startDate: dayjs(defaultValues?.startDate || new Date()).format(
        'YYYY-MM-DD'
      ),
      endDate: dayjs(defaultValues?.endDate || new Date()).format('YYYY-MM-DD'),
      moneyPrize: defaultValues.moneyPrize?.length
        ? defaultValues.moneyPrize
        : [{ categoryPrize: '', prize: '', currency: 'RWF' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'moneyPrize',
  });

  const { data: categoriesData } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const categories = categoriesData?.data?.categories?.map((category) => ({
    value: category.challengeCategoryName,
    label: category.challengeCategoryName,
  }));

  const { data: skillsData } = useGetSkillsQuery({ params: {} });
  const skills = skillsData?.data?.skills?.map((skill) => ({
    value: skill.skillName,
    label: skill.skillName,
  }));

  const prizeOptions = prizesData?.map((prize) => ({
    value: prize.prizeName,
    label: prize.prizeName,
  }));

  const seniorityLevels = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Senior', label: 'Senior' },
  ];

  const today = dayjs().startOf('day').toDate();

  const router = useRouter();

  const handleCancel = () => {
    router.push(dashboardRoutes.challengeHackathons.path);
  };

  return (
    <Card className="md:w-3/5 mx-auto p-6 my-10">
      <h1 className="text-2xl font-bold text-center">
        {isEdit ? 'Edit a Challenge' : 'Create New Challenge'}
      </h1>
      <p className="text-center text-primary_grey">
        Fill out these details to build your broadcast
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-10"
        >
          <FormField
            control={form.control}
            name="challengeName"
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

          <div className="flex flex-wrap md:flex-nowrap gap-5 w-full">
            <DateInput
              form={form}
              name="startDate"
              label="Start Date"
              placeHolder="Select start date"
              disablePast={!isEdit}
              disableBeforeDate={!isEdit?today:undefined}
            />
            <DateInput
              form={form}
              name="endDate"
              label="Deadline"
              placeHolder="Select deadline date"
              disablePast={true}
              disableBeforeDate={today}
            />
          </div>

          <div className="space-y-4">
            <FormLabel>Prize Pool</FormLabel>
            {fields?.map((field, index) => (
              <div
                key={field.id}
                className="flex gap-4 items-center justify-center w-full"
              >
                <SelectInput
                  form={form}
                  hideLabel={true}
                  name={
                    `moneyPrize.${index}.categoryPrize` as keyof CreateChallengeDto
                  }
                  label="Price Category"
                  options={prizeOptions}
                  multi={false}
                />
                <TextInput
                  form={form}
                  hideLabel={true}
                  name={`moneyPrize.${index}.prize` as keyof CreateChallengeDto}
                  label="Amount ($)"
                  placeholder="500"
                />
                {fields?.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-dashed border-red-600 text-red-600"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              className="border-dashed"
              type="button"
              onClick={() =>
                append({ categoryPrize: '', prize: '', currency: 'RWF' })
              }
              variant="outline"
            >
              + Add Prize
            </Button>
          </div>

          <TextInput
            form={form}
            name="teamSize"
            label="Team Size"
            type="number"
            defaultValue={1}
            min={1}
            placeholder="Enter max team size"
          />

          <TextInput
            form={form}
            name="contactEmail"
            label="Contact Email"
            type="email"
            placeholder="contact@example.com"
          />

          <FormField
            control={form.control}
            name="projectDescription"
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

          <SelectInput
            form={form}
            name="challengeCategory"
            label="Challenge Category"
            placeholder="Select a category"
            options={categories ?? []}
          />

          <SelectInput
            form={form}
            name="skills"
            label="Skills Needed"
            placeholder="Select skills needed"
            options={skills ?? []}
            multi={true}
          />

          <SelectInput
            form={form}
            name="levels"
            label="Seniority Level"
            placeholder="Select seniority level"
            options={seniorityLevels}
            multi={true}
          />

          <div className="w-full flex gap-5 py-5">
            <Button
              disabled={isSubmitting}
              onClick={handleCancel}
              className="w-5/12 h-12"
              variant="outline"
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={isSubmitting}
              className="w-7/12 h-12 flex items-center justify-center"
              type="submit"
            >
              {isSubmitting ? (
                <div className="h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              ) : isEdit ? (
                'Update Challenge'
              ) : (
                'Create Challenge'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ChallengeForm;
