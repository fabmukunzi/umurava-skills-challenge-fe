import Projectcard from '@/components/common/homepage/project-card';
import TalentStasticsCard from '@/components/dashboard/talent-stastics-card';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { IProject } from '@/lib/types/project';
import { ChevronRight, Eye } from 'lucide-react';
import Link from 'next/link';

const DashboardPage = () => {
  const challengesData: IProject[] = [
    {
      id: '12345',
      title: 'Design a Dashboard for SokoFund',
      deadline: new Date(),
      duration: '5 days',
      moneyPrize: '500 USD',
      skills: ['UI/UX Design', 'User Research', 'User Research'],
      seniorityLevel: ['Junior', 'Intermediate', 'Senior'],
      contactEmail: 'test1@example.com',
      description: 'Design a Dashboard for SokoFund description',
      brief: 'Brief for Design a Dashboard for SokoFund',
      tasks: 'Task 1',
    },
    {
      id: '1224455',
      title: 'Design a Dashboard for SokoFund',
      deadline: new Date(),
      duration: '7 days',
      moneyPrize: '1000 USD',
      skills: ['UI/UX Design', 'User Research', 'User Research'],
      seniorityLevel: ['Junior', 'Intermediate', 'Senior'],
      contactEmail: 'test2@example.com',
      description: 'Design a Dashboard for SokoFund description',
      brief: 'Brief for Design a Dashboard for SokoFund',
      tasks: 'Task 2',
    },
    {
      id: '1224466',
      title: 'Design a Dashboard for SokoFund',
      deadline: new Date(),
      duration: '7 days',
      moneyPrize: '1000 USD',
      skills: ['UI/UX Design', 'User Research', 'User Research'],
      seniorityLevel: ['Junior', 'Intermediate', 'Senior'],
      contactEmail: 'test2@example.com',
      description: 'Design a Dashboard for SokoFund description',
      brief: 'Brief for Design a Dashboard for SokoFund',
      tasks: 'Task 2',
    },
  ];
  const statistics = [
    { title: 'Completed Challenges', value: '05' },
    { title: 'Open Challenges', value: '200' },
    { title: 'Ongoing Challenges', value: '200' },
  ];
  return (
    <div className="px-4">
      <div className="flex flex-wrap max-w-screen-md:text-center justify-between items-center my-6">
        <div>
          <h1 className="text-2xl text-black font-semibold">
            Welcome back Hilaire,
          </h1>
          <p className="text-primary_grey">
            Build Work Experience through Skills Challenges
          </p>
        </div>
        <Button className="py-6">
          <Eye />
          View Profile
        </Button>
      </div>
      <div className="flex md:gap-10 gap-3 flex-wrap justify-center mx-auto my-10">
        {statistics.map((stat, index) => (
          <TalentStasticsCard
            title={stat.title}
            value={stat.value}
            key={index}
          />
        ))}
      </div>
      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black my-4">
          Recent Challenges
        </p>
        <Link
          className="flex items-center gap-4"
          href={dashboardRoutes.challengeHackathons.path}
        >
          See all <ChevronRight />
        </Link>
      </div>
      <div className="flex flex-wrap gap-5 justify-between mx-auto pb-20">
        {challengesData.map((challenge, index) => (
          <Projectcard
            className="2xl:w-[23.5rem]"
            key={index}
            project={challenge}
            usage='dashboard'
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
