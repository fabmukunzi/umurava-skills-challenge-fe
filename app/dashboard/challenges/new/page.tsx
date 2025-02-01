'use client';

import { useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import { ChallengeFormData } from '@/lib/challenge-form-validation';

const CreateChallengePage = () => {
  const router = useRouter();

  const onSubmit = (values: ChallengeFormData) => {
    console.log(values);
    router.push('/challenges');
  };

  return (
    <ChallengeForm
      onSubmit={onSubmit}
      defaultValues={{
        title: '',
        projectBrief: '',
        description: '',
        challengeCategory: '',
        moneyPrize: '',
        submissionLink: '',
        deadline: new Date(),
        startDate: new Date(),
        contactEmail: '',
        skillsNeeded: [],
        seniorityLevel: [],
      }}
    />
  );
};

export default CreateChallengePage;
