'use client';

import SkeletonCard from '@/components/common/challenge-skeleton-card';
import Projectcard from '@/components/common/homepage/project-card';
import NoChallengeFound from '@/components/common/no-challenge-found';
import SVGIcon from '@/components/common/svg';
import FlatPaperIcon from '@/components/common/svg/flatpaper-icon';
import UserGroupIcon from '@/components/common/svg/user-group-icon';
import AdminStatCard from '@/components/dashboard/admin-statistics-card';
import TalentStasticsCard from '@/components/dashboard/talent-statistics-card';
import { dashboardRoutes } from '@/lib/routes';
import { useGetChallengesQuery, useGetParticipantChallengesQuery, useGiveChallengeStatisticsQuery } from '@/store/actions/challenge';
import { ChevronRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const session = useSession();
  const user = session.data?.user;
  const isAdmin = ['admin', 'super admin'].includes(user?.role?.toLowerCase() || '');
  const [searchParam, setSearchParam] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchParam(search);
    }
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetChallengesQuery({ limit: 3, page: 1, search: searchParam }, { refetchOnMountOrArgChange: true });
  const { data: participantChallenges, isLoading: participantChallengesLoading, isFetching: particpantChallengeFetching } = useGetParticipantChallengesQuery(
    {
      limit: 3,
      page: 1,
      search: searchParam
    },
    { skip: isAdmin }
  );
  const { data: statisticsData, isLoading: statisticsLoading, isFetching: statisticsFetching } = useGiveChallengeStatisticsQuery();

  const challengesData = isAdmin ? data?.data?.challenges : participantChallenges?.data?.challenges;

  const statistics = [
    {
      title: 'Completed Challenges',
      value: isAdmin ? data?.data.aggregates.totalCompletedChallenges : participantChallenges?.data.aggregates.totalCompletedChallenges,
    },
    {
      title: 'Open Challenges',
      value: isAdmin ? data?.data.aggregates.totalOpenChallenges : participantChallenges?.data.aggregates.totalOpenChallenges,
    },
    {
      title: 'Ongoing Challenges',
      value: isAdmin ? data?.data.aggregates.totalOngoingChallenges : participantChallenges?.data.aggregates.totalOngoingChallenges,
    },
    {
      title: 'Total Closed Challenges',
      value: isAdmin ? data?.data.aggregates.totolClosedChallenges : participantChallenges?.data.aggregates.totolClosedChallenges,
    }
  ];

  const adminStatData = [
    {
      title: 'Total Challenges',
      number: statisticsData?.data?.totalChallengesThisWeek || 0,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: statisticsData?.data?.totalChallengesThisWeekChange || 0,
      direction: String(statisticsData?.data?.totalChallengesThisWeekChangeDirection || 'negative'),
    },
    {
      title: 'Total Participants',
      number: statisticsData?.data?.totalParticipantsThisWeek || 0,
      icon: <SVGIcon height={20} width={20} Icon={UserGroupIcon} />,
      percentage: statisticsData?.data?.totalParticipantsThisWeekChange || 0,
      direction: String(statisticsData?.data?.totalParticipantsThisWeekChangeDirection || 'negative'),
    },
    {
      title: 'Completed Challenges',
      number: statisticsData?.data?.totalCompletedChallenges || 0,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: statisticsData?.data?.totalCompletedChallengesChange || 0,
      direction: String(statisticsData?.data?.totalCompletedChallengesChangeDirection || 'negative'),
    },
    {
      title: 'Open Challenges',
      number: statisticsData?.data?.totalOpenChallenges || 0,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: statisticsData?.data?.totalOpenChallengesChange || 0,
      direction: String(statisticsData?.data?.totalOpenChallengesChangeDirection || 'negative'),
    },
    {
      title: 'Ongoing Challenges',
      number: statisticsData?.data?.totalOngoingChallenges || 0,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: statisticsData?.data?.totalOngoingChallengesChange || 0,
      direction: String(statisticsData?.data?.totalOngoingChallengesChangeDirection || 'negative'),
    },
  ];

  return (
    <div className="px-2">
      <div className="flex flex-wrap max-w-screen-md:text-center justify-between items-center my-6">
        <div>
          <h1 className="text-2xl text-black font-semibold capitalize">
            Welcome back {user?.name?.split(' ')[0]},
          </h1>
          <p className="text-primary_grey">
            Build Work Experience through Skills Challenges
          </p>
        </div>

      </div>
      {!isAdmin ? (
        <div className="flex md:gap-10 gap-3 flex-wrap justify-center mx-auto my-10">
          {statistics.map((stat, index) => (
            <TalentStasticsCard
              title={stat.title}
              value={stat?.value?.toString() || '0'}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-6 gap-6 my-10 !z-0">
          {(statisticsLoading || statisticsFetching) ? (Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`${i < 2 ? 'md:col-span-3' : 'md:col-span-2'} h-32 rounded-xl bg-primary/30 animate-pulse`}
            />
          ))
          ) : adminStatData.map((card, index) => (
            <div
              key={index}
              className={index < 2 ? 'md:col-span-3' : 'md:col-span-2'}
            >
              <AdminStatCard {...card} />
            </div>
          ))}
        </div>
      )
      }

      {
        ((isLoading || isFetching)) || (!isAdmin && (participantChallengesLoading || particpantChallengeFetching)) ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-20">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard className="w-full" key={index} />
            ))}
          </div>
        ) : challengesData && challengesData.length > 0 ? (
          <>
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
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 pb-20 mx-auto">
              {challengesData.map((challenge, index) => (
                <Projectcard key={index} project={challenge} usage="dashboard" />
              ))}
            </div>
          </>
        ) : (
          <NoChallengeFound
            isAdmin={isAdmin}
          />
        )
      }
    </div >
  );
};

export default DashboardPage;
