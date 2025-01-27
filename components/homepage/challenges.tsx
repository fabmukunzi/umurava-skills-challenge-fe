import { IProject } from '@/lib/types/project';
import Projectcard from '../common/homepage/project-card';
import { Button } from '../ui/button';
import Link from 'next/link';

const Challenges = () => {
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
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 2xl:px-20 border-b pb-10">
      <div className="text-center text-black py-20 xl:w-1/2 md:w-2/3 mx-auto">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">
          Explore Challenges & Hackathons 
        </h1>
        <p className="my-4 text-primary_grey">
          Join Skills Challenges Program to accelerate your career growth and
          become part of Africa’s largest workforce of digital professionals. 
        </p>
      </div>
      <div className="flex gap-6 flex-wrap justify-center mx-auto">
        {challengesData.map((challenge, index) => (
          <Projectcard key={index} project={challenge} />
        ))}
      </div>
      <div>
        <Link className="flex justify-center my-10" href="/challenges">
          <Button
            className="border-primary hover:text-primary px-14 py-6 border-2 font-semibold"
            size="lg"
            variant="outline"
          >
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Challenges;
