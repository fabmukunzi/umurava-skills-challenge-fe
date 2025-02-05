'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams, useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import {
  CreateChallengeDto,
  useGetChallengeByIdQuery,
  useUpdateChallengeMutation,
} from '@/store/actions/challenge';
import { dashboardRoutes } from '@/lib/routes';
import { useToast } from '@/hooks/use-toast';

const EditChallengePage = () => {
  const router = useRouter();
  const params = useParams();
  const challengeId = params?.challengeId as string;

  const [updateChallenge, { isLoading: updatingChallenge }] =
    useUpdateChallengeMutation();
  const { data, isLoading } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });

  const { toast } = useToast();

  const project = {
    ...data?.challenge,
    deadline: data?.challenge?.deadline
      ? new Date(data.challenge.deadline)
      : null,
    startDate: data?.challenge?.startDate
      ? new Date(data.challenge.startDate)
      : null,
  };

  const onSubmit = async (values: CreateChallengeDto) => {
    try {
      await updateChallenge({ id: challengeId, ...values }).unwrap();
      toast({
        title: 'Challenge updated successfully',
      });
      router.push(dashboardRoutes.challengeHackathons.path);
    } catch (err: any) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
        description: err?.data?.message,
      });
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
      defaultValues={project as CreateChallengeDto}
    />
  );
};

export default EditChallengePage;
