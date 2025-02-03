'use client';

import { useParams, useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import {
  CreateChallengeDto,
  useGetChallengeByIdQuery,
} from '@/store/actions/challenge';

const EditChallengePage = () => {
  const router = useRouter();
  const params = useParams();
  const challengeId = params?.challengeId as string;

  const { data } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });

  const project = data?.challenge;

  const onSubmit = (values: CreateChallengeDto) => {
    console.log(values);
    router.push('/challenges');
  };

  return (
    <ChallengeForm
      isEdit={true}
      onSubmit={onSubmit}
      defaultValues={project as CreateChallengeDto}
    />
  );
};

export default EditChallengePage;
