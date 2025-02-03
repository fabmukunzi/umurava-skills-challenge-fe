'use client';

import CustomBreadcrumb from '@/components/common/bread-crumb';
import ProjectCard from '@/components/common/homepage/project-card';
import SkeletonCard from '@/components/common/skeleton-card';
import { homepageRoutes } from '@/lib/routes';
import { useGetChallengesQuery } from '@/store/actions/challenge';
import { motion } from 'framer-motion';

const ChallengesPage = () => {
  const { data, isLoading } = useGetChallengesQuery({ limit: 9, page: 1 });
  const challengesData = data?.challenges || [];

  return (
    <div className="bg-secondary_bg">
      {/* Breadcrumb Navigation */}
      <CustomBreadcrumb
        className="pt-20 pb-10 w-11/12 mx-auto"
        items={[
          {
            label: 'Challenges & Hackathons',
            href: homepageRoutes.challengeHackathons.path,
          },
        ]}
      />

      {isLoading ? (
        <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-20">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-5 pb-20 w-11/12 mx-auto"
        >
          {challengesData.map((challenge) => (
            <ProjectCard key={challenge.id} project={challenge} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ChallengesPage;
