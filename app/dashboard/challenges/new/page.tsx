'use client';

import { useRouter } from 'next/navigation';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import { CreateChallengeDto, useCreateChallengeMutation } from '@/store/actions/challenge';
import { dashboardRoutes } from '@/lib/routes';

const CreateChallengePage = () => {
  const router = useRouter();
  const [createChallenge] = useCreateChallengeMutation();

  const onSubmit = async(values: CreateChallengeDto) => {

    try{
    await createChallenge(values).unwrap();
    router.push(dashboardRoutes.challengeHackathons.path);  
    }catch(err){
      console.log(err);
    }
    
  };

  return (
    <ChallengeForm
      onSubmit={onSubmit}
      defaultValues={{
        challengeTitle: '',
        projectBrief: '',
        description: '',
        categoryId: '',
        moneyPrize: '',
        submissionLink: '',
        deadline: '',
        startDate: '',
        contactEmail: '',
        skills: [],
        seniority: [],
      }}
    />
  );
};

export default CreateChallengePage;
