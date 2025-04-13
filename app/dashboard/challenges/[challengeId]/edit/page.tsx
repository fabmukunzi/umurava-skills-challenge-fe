'use client';

import { useParams, useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import {
  CreateChallengeDto,
  useGetChallengeByIdQuery,
  useUpdateChallengeMutation,
} from '@/store/actions/challenge';
import { dashboardRoutes } from '@/lib/routes';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/errorHandler';
import dayjs from 'dayjs';
import { useGetPrizesQuery } from '@/store/actions/setting';

const EditChallengePage = () => {
  const router = useRouter();
  const params = useParams();
  const challengeId = params?.challengeId as string;

  const [updateChallenge, { isLoading: updatingChallenge }] =
    useUpdateChallengeMutation();
  const { data, isLoading } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });
  const { data: prizesData } = useGetPrizesQuery();

  const { toast } = useToast();

  const project = data?.data;
  const restValues: CreateChallengeDto = {
    challengeName: project?.challengeName || '',
    challengeCategory: project?.challengeCategory || '',
    startDate: project?.startDate || dayjs().format('YYYY-MM-DD'),
    endDate: project?.endDate || dayjs().format('YYYY-MM-DD'),
    moneyPrize: project?.moneyPrize || [],
    contactEmail: project?.contactEmail || '',
    projectDescription: project?.projectDescription || '',
    teamSize: project?.teamSize?.toString() || '',
    skills: project?.skills || [],
    levels: project?.levels || [],
  };

  const onSubmit = async (values: CreateChallengeDto) => {
    try {
      const { startDate, endDate, moneyPrize, ...restValues } = values;
      const moneyPrizeFormated = moneyPrize
        .map((item) => {
          const selectedPrize = prizesData?.data?.find(
            (p) => p.prizeName === item.categoryPrize
          );
          return {
            ...item,
            currency: selectedPrize?.currency || '',
            categoryPrize: selectedPrize?.prizeName || '',
          };
        })
        .filter((item) => item !== null);
      await updateChallenge({
        id: challengeId,
        startDate: dayjs(startDate).format('DD-MM-YYYY'),
        endDate: dayjs(endDate).format('DD-MM-YYYY'),
        moneyPrize: moneyPrizeFormated,
        ...restValues,
      }).unwrap();
      toast({
        title: 'Challenge updated successfully',
      });
      router.push(dashboardRoutes.challengeHackathons.path);
    } catch (err) {
      handleError(err);
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <ChallengeForm
      isEdit={true}
      onSubmit={onSubmit}
      isSubmitting={updatingChallenge}
      defaultValues={restValues}
      prizesData={prizesData?.data ?? []}
    />
  );
};

export default EditChallengePage;
