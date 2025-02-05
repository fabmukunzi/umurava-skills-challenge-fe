'use client';

import CustomBreadcrumb from '@/components/common/bread-crumb';
import ProjectCard from '@/components/common/homepage/project-card';
import SkeletonCard from '@/components/common/challenge-skeleton-card';
import { homepageRoutes } from '@/lib/routes';
import { useGetChallengesQuery } from '@/store/actions/challenge';
import { motion } from 'framer-motion';
import { useGetSkillsQuery } from '@/store/actions/categories';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const ITEMS_PER_PAGE = 9;
const ChallengesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching } = useGetChallengesQuery({
    limit: ITEMS_PER_PAGE,
    page: currentPage,
  });
  const challengesData = data?.challenges || [];

  const { data: skillsData, isLoading: loadingSkills } = useGetSkillsQuery();

  const totalPages = data?.totalPages || 0;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const getSkillNamesByIds = (ids: string[]) => {
    return ids.map((id) => {
      const skill = skillsData?.skills?.find((skill) => skill.id === id);
      return skill ? skill.name : '';
    });
  };
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

      {isLoading || loadingSkills ? (
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
            <ProjectCard
              key={challenge.id}
              project={{
                ...challenge,
                skills: getSkillNamesByIds(challenge.skills),
              }}
            />
          ))}
        </motion.div>
      )}
      <div className="flex justify-between md:mx-20 my-10 pb-10">
        <Button
          disabled={isLoading || isFetching || currentPage === 1}
          variant="outline"
          className="w-24"
          onClick={handlePrev}
        >
          Previous
        </Button>
        <Button
          disabled={isLoading || isFetching || currentPage === totalPages}
          className="w-24"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ChallengesPage;
