import Projectcard from '@/components/common/homepage/project-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { IProject } from '@/lib/types/project';
import { MoveLeft, Slash } from 'lucide-react';

const ChallegesPage = () => {
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

  // Generate 12 data objects
  const challengesData: IProject[] = Array.from({ length: 12 }, (_, index) => ({
    ...baseData,
    id: `${baseData.id}-${index + 1}`,
    title: `${baseData.title}`,
    deadline: new Date(new Date().getTime() + index * 24 * 60 * 60 * 1000),
  }));

  return (
    <div className="bg-secondary_bg">
      <Breadcrumb className="text-black pt-20 pb-10 w-11/12 mx-auto">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Button variant="outline" className="w-3 h-8 border-2 mr-2">
              <MoveLeft />
            </Button>
            <BreadcrumbLink
              className="text-primary_grey font-medium md:text-lg"
              href="/"
            >
              Go Back
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-primary md:text-lg font-medium">
              Challenges & Hackathons
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 pb-20 w-11/12 mx-auto">
        {challengesData.map((challenge) => (
          <Projectcard key={challenge.id} project={challenge} />
        ))}
      </div>
    </div>
  );
};

export default ChallegesPage;
