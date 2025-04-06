'use client';

import { useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import {
  CreateChallengeDto,
  useCreateChallengeMutation,
} from '@/store/actions/challenge';
import { dashboardRoutes } from '@/lib/routes';
import dayjs from 'dayjs';
import { handleError } from '@/lib/errorHandler';

const CreateChallengePage = () => {
  const router = useRouter();
  const [createChallenge, { isLoading }] = useCreateChallengeMutation();

  const onSubmit = async (values: CreateChallengeDto) => {
    try {
      const { startDate, endDate, ...restValues } = values;
      await createChallenge({
        startDate: dayjs(startDate).format('DD-MM-YYYY'),
        endDate: dayjs(endDate).format('DD-MM-YYYY'),
        ...restValues,
      }).unwrap();
      router.push(dashboardRoutes.challengeHackathons.path);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <ChallengeForm
      onSubmit={onSubmit}
      isSubmitting={isLoading}
      defaultValues={{
        challengeName: '',
        projectDescription: '',
        challengeCategory: '',
        moneyPrize: [],
        endDate: '',
        startDate: '',
        contactEmail: '',
        skills: [],
        levels: [],
        teamSize: '',
      }}
    />
  );
};

export default CreateChallengePage;
