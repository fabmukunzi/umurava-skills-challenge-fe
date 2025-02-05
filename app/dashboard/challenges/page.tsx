'use client';

import Projectcard from '@/components/common/homepage/project-card';
import SkeletonCard from '@/components/common/challenge-skeleton-card';
import SVGIcon from '@/components/common/svg';
import PaperIcon from '@/components/common/svg/paper-icon';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { AppState } from '@/lib/types/user';
import { useGetChallengesQuery } from '@/store/actions/challenge';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useGetSkillsQuery } from '@/store/actions/categories';

const ITEMS_PER_PAGE = 6;
const ChallengesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = useGetChallengesQuery({
    limit: ITEMS_PER_PAGE,
    page: currentPage,
  });
  const challengesData = data?.challenges;
  const user = useSelector((state: AppState) => state?.userReducer?.user);

  const totalPages = data?.totalPages || 0;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const { data: skillsData, isLoading: loadingSkills } = useGetSkillsQuery();

  const getSkillNamesByIds = (ids: string[]) => {
    return ids.map((id) => {
      const skill = skillsData?.skills?.find((skill) => skill.id === id);
      return skill ? skill.name : '';
    });
  };
  return (
    <div className="md:px-4">
      <div className="my-4">
        <h1 className="text-2xl text-black font-semibold">Challenges</h1>
        <p className="text-primary_grey">
          Join a challenge or a hackathon to gain valuable work experience,
        </p>
      </div>
      <div className="my-10 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 flex-grow gap-5">
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          All Challenges
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            {data?.total}
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          Completed Challenges
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            {data?.statusCounts.Completed}
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          Open Challenges
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            {data?.statusCounts.Open}
          </span>
        </Button>
        <Button
          variant="outline"
          className="bg-secondary_bg justify-between text-sm font-normal border-[#98A2B3] text-black"
        >
          <SVGIcon Icon={PaperIcon} color="#98A2B3" />
          Ongoing Challenges
          <span className="bg-neutral-300 rounded-3xl flex-shrink-0 h-5 w-5">
            {data?.statusCounts.Ongoing}
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
      {isLoading || isFetching || loadingSkills ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-20">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard className="w-full" key={index} />
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mx-auto">
          {challengesData?.map((challenge) => (
            <Projectcard
              usage="dashboard"
              key={challenge.id}
              project={{
                ...challenge,
                skills: getSkillNamesByIds(challenge.skills),
              }}
            />
          ))}
        </div>
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
