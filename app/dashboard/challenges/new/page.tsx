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
import { IPrizeCategory } from '@/lib/types/setting';

const CreateChallengePage = () => {
  const router = useRouter();
  const [createChallenge, { isLoading }] = useCreateChallengeMutation();

  const onSubmit = async (values: CreateChallengeDto) => {
    try {
      const { startDate, endDate, moneyPrize, ...restValues } = values;
      const moneyPrizeFormated = moneyPrize
        .map((item) => {
          const parsedItem = JSON.parse(item.categoryPrize) as IPrizeCategory;
          return {
            ...item,
            currency: parsedItem.currency,
            categoryPrize: parsedItem.prizeName,
          };
        })
        .filter((item) => item !== null);
      await createChallenge({
        startDate: dayjs(startDate).format('DD-MM-YYYY'),
        endDate: dayjs(endDate).format('DD-MM-YYYY'),
        moneyPrize: moneyPrizeFormated,
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
