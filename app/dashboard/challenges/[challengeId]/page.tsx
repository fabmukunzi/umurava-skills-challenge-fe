import CustomBreadcrumb from '@/components/common/bread-crumb';
import { Card } from '@/components/ui/card';
import { UmuravaWhiteLogo } from '@/lib/images';
import { dashboardRoutes } from '@/lib/routes';
import Image from 'next/image';

const SingleChallengePage = () => {
  const project = {
    id: '12345',
    title: 'Payroll and HR Management System',
    deadline: new Date(),
    duration: '5 days',
    moneyPrize: '500 USD',
    skills: ['UI/UX Design', 'User Research', 'User Research'],
    seniorityLevel: ['Junior', 'Intermediate', 'Senior'],
    contactEmail: 'test1@example.com',
    description:
      'A Fintech company that is developing a Digital Financial Platform designed for businesses and their workforce in Africa is partnering with Umurava to run a Skills Challenge for Product Design. This Fintech Company offers Payroll Management System to Employers and Embedded Financial services and products to Employees and Gig Workers across Africa.',
    brief: 'Brief for Design a Dashboard for SokoFund',
    tasks: 'Task 1',
  };
  return (
    <div>
      <CustomBreadcrumb
        items={[
          {
            label: 'Challenges & Hackathons',
            href: dashboardRoutes.challengeHackathons.path,
          },
          {
            label: project.title,
          },
        ]}
      />

      <div>
        <Card className="w-7/12 p-6">
          <div className="relative bg-primary h-48 flex items-center justify-center rounded-lg">
            <Image src={UmuravaWhiteLogo} alt="Umarava Logo" />
          </div>
          <h1>Project Brief : {project.title}</h1>
          <p>{project.description}</p>
          <h1>Tasks:</h1>
        </Card>
      </div>
    </div>
  );
};

export default SingleChallengePage;
