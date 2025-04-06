'use client';

import Projectcard from '@/components/common/homepage/project-card';
import SkeletonCard from '@/components/common/challenge-skeleton-card';
import SVGIcon from '@/components/common/svg';
import PaperIcon from '@/components/common/svg/paper-icon';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { useGetChallengesQuery } from '@/store/actions/challenge';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import NoChallengeFound from '@/components/common/no-challenge-found';

const ITEMS_PER_PAGE = 6;
const ChallengesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('');

  const { data, isLoading, isFetching } = useGetChallengesQuery({
    limit: ITEMS_PER_PAGE,
    page: currentPage,
    status,
  });
  const challengesData = data?.data?.challenges;

  const totalPages = data?.data.pagination.totalPages || 0;

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const session = useSession();
  const user = session.data?.user;
  const handleSetStatus = (status: string) => {
    setStatus(status);
    setCurrentPage(1);
  };

  const statusOptions = [
    {
      label: 'All Challenges',
      value: '',
      count: data?.data.aggregates.totalChallenges,
    },
    {
      label: 'Completed Challenges',
      value: 'completed',
      count: data?.data.aggregates.totalCompletedChallenges,
    },
    {
      label: 'Open Challenges',
      value: 'open',
      count: data?.data.aggregates.totalOpenChallenges,
    },
    {
      label: 'Ongoing Challenges',
      value: 'ongoing',
      count: data?.data.aggregates.totalOngoingChallenges,
    },
  ];
  return (
    <div className="md:px-4">
      <div className="my-4">
        <h1 className="text-2xl text-black font-semibold">Challenges</h1>
        <p className="text-primary_grey">
          Join a challenge or a hackathon to gain valuable work experience,
        </p>
      </div>
      <div className="my-10 grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
        {statusOptions.map(({ label, value, count }) => (
          <Button
            key={value}
            variant="outline"
            onClick={() => handleSetStatus(value)}
            className={clsx(
              'flex items-center justify-between gap-2 bg-secondary_bg w-full text-sm font-normal border-[#98A2B3] text-black px-4 py-3',
              status === value &&
                'bg-blue-200 hover:bg-blue-200 border-primary text-black'
            )}
          >
            <div className="flex items-center gap-2">
              <SVGIcon
                Icon={PaperIcon}
                color={status === value ? 'black' : '#98A2B3'}
              />
              {label}
            </div>
            <span
              className={clsx(
                'bg-neutral-300 rounded-3xl h-5 p-1.5 grid place-content-center text-xs',
                status === value && 'bg-primary text-white'
              )}
            >
              {count}
            </span>
          </Button>
        ))}

        {['admin', 'super admin'].includes(user?.role?.toLowerCase() || '') && (
          <Link href={dashboardRoutes.challengeHackathons.new.path}>
            <Button size="lg" className="col-span-2 md:col-span-1">
              <Plus />
              Create New Challenge
            </Button>
          </Link>
        )}
      </div>
      {isLoading || isFetching ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-20">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard className="w-full" key={index} />
          ))}
        </div>
      ) : challengesData && challengesData.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-20">
          {challengesData.map((challenge) => (
            <Projectcard
              usage="dashboard"
              key={challenge._id}
              project={challenge}
            />
          ))}
        </div>
      ) : (
        <NoChallengeFound
          isAdmin={['admin', 'super admin'].includes(
            user?.role?.toLowerCase() || ''
          )}
        />
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
