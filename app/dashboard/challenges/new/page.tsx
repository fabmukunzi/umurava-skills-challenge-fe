'use client';

import { useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import {
  CreateChallengeDto,
  useCreateChallengeMutation,
} from '@/store/actions/challenge';
import { dashboardRoutes } from '@/lib/routes';
import { useToast } from '@/hooks/use-toast';

const CreateChallengePage = () => {
  const router = useRouter();
  const [createChallenge, { isLoading }] = useCreateChallengeMutation();
  const { toast } = useToast();

  const onSubmit = async (values: CreateChallengeDto) => {
    try {
      await createChallenge(values).unwrap();
      router.push(dashboardRoutes.challengeHackathons.path);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
        description: error?.data?.message,
      });
    }
  };

  return (
    <ChallengeForm
      onSubmit={onSubmit}
      isSubmitting={isLoading}
      defaultValues={{
        challengeTitle: '',
        projectBrief: '',
        description: '',
        categoryId: '',
        moneyPrize: '',
        submissionLink: '',
        deadline: new Date(),
        startDate: new Date(),
        contactEmail: '',
        skills: [],
        seniority: [],
      }}
    />
  );
};

export default CreateChallengePage;
