import Projectcard from '@/components/common/homepage/project-card';
import SVGIcon from '@/components/common/svg';
import PaperIcon from '@/components/common/svg/paper-icon';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { IProject } from '@/lib/types/project';
import { Plus } from 'lucide-react';
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
  const user = {
    role: 'TALENT',
  };
  return (
    <div className="md:px-4">
      <div className="my-4">
        <h1 className="text-2xl text-black font-semibold">Challenges</h1>
        <p className="text-primary_grey">
          Join a challenge or a hackathon to gain valuable work experience,
        </p>
      </div>
      <div className="my-10 grid md:grid-cols-2 lg:grid-cols-5 flex-grow gap-5">
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          All Challenge
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            0
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          Completed Challenge
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            0
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          Open Challenge
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            0
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          Ongoing Challenge
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            0
          </span>
        </Button>
        {user.role === 'ADMIN' && (
          <Link href={dashboardRoutes.challengeHackathons.new.path}>
            <Button size="lg" className="col-span-2 md:col-span-1">
              <Plus />
              Create New Challenge
            </Button>
          </Link>
        )}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mx-auto">
        {challengesData.map((challenge) => (
          <Projectcard
            usage="dashboard"
            key={challenge.id}
            project={challenge}
          />
        ))}
      </div>
      <div className="flex justify-between md:mx-20 my-10 pb-10">
        <Button variant="outline" className="w-24">
          Previous
        </Button>
        <Button className="w-24">Next</Button>
      </div>
    </div>
  );
};

export default ChallengesPage;
