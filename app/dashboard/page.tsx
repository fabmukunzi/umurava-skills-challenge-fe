import Projectcard from '@/components/common/homepage/project-card';
import AdminStatCard from '@/components/dashboard/admin-statistics-card';
import TalentStasticsCard from '@/components/dashboard/talent-statistics-card';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { IProject } from '@/lib/types/project';
import { ChevronRight, Eye, FileText, SquareMenu, Users2 } from 'lucide-react';
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
  const user = {
    role: 'ADMIN',
  };
  const adminStatData = [
    {
      title: 'Total Challenges',
      number: 29405,
      icon: <SquareMenu size={24} />,
      percentage: 15,
    },
    {
      title: 'Total Participants',
      number: 29405,
      icon: <Users2 size={24} />,
      percentage: 8,
    },
    {
      title: 'Reports Generated',
      number: 300,
      icon: <SquareMenu size={24} />,
      percentage: 5,
    },
    {
      title: 'New Clients',
      number: 75,
      icon: <SquareMenu size={24} />,
      percentage: 12,
    },
    {
      title: 'Notifications Sent',
      number: 980,
      icon: <FileText size={24} />,
      percentage: 20,
    },
  ];
  return (
    <div className="px-2">
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
      {user.role !== 'ADMIN' ? (
        <div className="flex md:gap-10 gap-3 flex-wrap justify-center mx-auto my-10">
          {statistics.map((stat, index) => (
            <TalentStasticsCard
              title={stat.title}
              value={stat.value}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-6 gap-6 my-10">
          {adminStatData.map((card, index) => (
            <div
              key={index}
              className={
                index < 2
                  ? 'md:col-span-3'
                  : 'md:col-span-2'
              }
            >
              <AdminStatCard {...card} />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <p className="text-lg font-semibold text-black my-6">
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
            usage="dashboard"
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
