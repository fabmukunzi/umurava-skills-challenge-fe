'use client';

import CustomBreadcrumb from '@/components/common/bread-crumb';
import Projectcard from '@/components/common/homepage/project-card';
import { homepageRoutes } from '@/lib/routes';
import { IProject } from '@/lib/types/project';
import { motion } from 'framer-motion';

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

  const challengesData: IProject[] = Array.from({ length: 12 }, (_, index) => ({
    ...baseData,
    id: `${baseData.id}-${index + 1}`,
    title: `${baseData.title}`,
    deadline: new Date(new Date().getTime() + index * 24 * 60 * 60 * 1000),
  }));

  return (
    <div className="bg-secondary_bg">
      <CustomBreadcrumb
        className="pt-20 pb-10 w-11/12 mx-auto"
        items={[
          {
            label: 'Challenges & Hackathons',
            href: homepageRoutes.challengeHackathons.path,
          },
        ]}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        viewport={{ once: true }}
        className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 pb-20 w-11/12 mx-auto"
      >
        {challengesData.map((challenge) => (
          <Projectcard key={challenge.id} project={challenge} />
        ))}
      </motion.div>
    </div>
  );
};

export default ChallegesPage;
