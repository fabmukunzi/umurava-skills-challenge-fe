'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ChallengeForm from '@/components/common/dashboard/challenge-form';
import { ChallengeFormData } from '@/lib/challenge-form-validation';

const EditChallengePage = () => {
  const router = useRouter();
  //   const { challengeId } = router.query;
  const [existingChallenge, setExistingChallenge] =
    useState<ChallengeFormData | null>(null);

  useEffect(() => {
    if (true) {
      const fetchedChallenge = {
        title: 'Design a Dashboard for Sokofund',
        projectBrief:
          'A Fintech company that is developing a Digital Financial Platform designed for businesses and their workforce in Africa is partnering with Umurava to run a Skills Challenge for Product Design. This Fintech Company offers Payroll Management System to Employers and Embedded Financial services and products to Employees and Gig Workers across Africa.',
        description:
          '<p><strong>Product Requirements</strong></p><ul><li>UX research to understand Project Requirements&nbsp;</li><li>Understanding User Needs</li><li>Understanding Business Goals&nbsp;</li><li>Determine interaction between users&nbsp;</li><li>Requirements Catalog</li></ul><p><strong>Product Design:</strong></p><ul><li>User Interface Design for each step&nbsp;</li><li>Creating wireframes to outline the basic structure and layout of the web and mobile app.</li><li>Designing visually appealing and user-friendly interfaces for the web and mobile apps focusing on usability and user experience.</li><li>Ensuring the web application works seamlessly across web, mobile, and tablet devices.</li><li>Provide a feedback session for in-development guidance</li></ul><p><strong>Deliverables:</strong></p><ul><li>Requirements Catalog and User Interaction Diagram</li><li>User Interface Mockups&nbsp;</li><li>Payroll and HR System Design Completed</li></ul><p><strong>Note</strong></p><p>Find Product Requirements Summary and Features Description for Saway Pay <a href="https://google.rw/" rel="noopener noreferrer" target="_blank">HERE</a></p>',
        challengeCategory: 'Web design',
        moneyPrize: '$150 - $400',
        submissionLink: 'http://example.com',
        deadline: new Date(),
        startDate: new Date(),
        contactEmail: 'talent@umurava.africa',
        skillsNeeded: ['UI/UX Design', 'User Research'],
        seniorityLevel: ['Intermediate'],
      };
      setExistingChallenge(fetchedChallenge);
    }
  }, []);

  const onSubmit = (values: ChallengeFormData) => {
    console.log(values);
    router.push('/challenges');
  };

  if (!existingChallenge) return <div>Loading...</div>;

  return (
    <ChallengeForm
      isEdit={true}
      onSubmit={onSubmit}
      defaultValues={existingChallenge}
    />
  );
};

export default EditChallengePage;
