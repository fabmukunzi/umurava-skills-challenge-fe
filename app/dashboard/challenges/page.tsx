import Projectcard from '@/components/common/homepage/project-card';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { IProject } from '@/lib/types/project';
import { BookText, Plus } from 'lucide-react';
import Link from 'next/link';

const ChallengesPage = () => {
  const baseData: IProject = {
    id: '12345',
    title: 'Design a Dashboard for SokoFund',
    deadline: new Date(),
    duration: '5 days',
    moneyPrize: '500 USD',
    skills: ['UI/UX Design', 'User Research', 'User Research'],
    seniorityLevel: ['Junior', 'Intermediate', 'Senior'],
    contactEmail: 'test@example.com',
    description: 'Design a Dashboard for SokoFund description',
    brief: 'Brief for Design a Dashboard for SokoFund',
    tasks: 'Task 1',
  };
  const challengesData: IProject[] = Array.from({ length: 6 }, (_, index) => ({
    ...baseData,
    id: `${baseData.id}-${index + 1}`,
    title: `${baseData.title}`,
    deadline: new Date(new Date().getTime() + index * 24 * 60 * 60 * 1000),
  }));
  return (
    <div className="md:px-4">
      <div className="my-4">
        <h1 className="text-2xl text-black font-semibold">Challenges</h1>
        <p className="text-primary_grey">
          Join a challenge or a hackathon to gain valuable work experience,
        </p>
      </div>
      <div className="my-10 grid grid-cols-2 lg:grid-cols-5 flex-grow gap-5">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <Button
              variant="outline"
              className="bg-secondary_bg text-sm font-normal border-neutral-500 text-black 2xl:w-52"
              key={index}
            >
              <BookText className="text-neutral-500" />
              All Challenge
              <span className="bg-neutral-300 rounded-3xl h-5 w-5">0</span>
            </Button>
          ))}
        <Link href={dashboardRoutes.challengeHackathons.new.path}>
          <Button size="lg" className="col-span-2 md:col-span-1">
            <Plus />
            Create New Challenge
          </Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 pb-20 mx-auto">
        {challengesData.map((challenge) => (
          <Projectcard
            usage="dashboard"
            key={challenge.id}
            project={challenge}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesPage;
