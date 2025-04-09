'use client';

import SkeletonCard from '@/components/common/challenge-skeleton-card';
import Projectcard from '@/components/common/homepage/project-card';
import NoChallengeFound from '@/components/common/no-challenge-found';
import SVGIcon from '@/components/common/svg';
import FlatPaperIcon from '@/components/common/svg/flatpaper-icon';
import UserGroupIcon from '@/components/common/svg/user-group-icon';
import AdminStatCard from '@/components/dashboard/admin-statistics-card';
import TalentStasticsCard from '@/components/dashboard/talent-statistics-card';
import { Button } from '@/components/ui/button';
import { dashboardRoutes } from '@/lib/routes';
import { useGetChallengesQuery } from '@/store/actions/challenge';
import { ChevronRight, Eye } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const [searchParam, setSearchParam] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const search = searchParams.get('search');
    if (search) {
      setSearchParam(search);
    }
  }, [searchParams]);

  const { data, isLoading, isFetching } = useGetChallengesQuery({ limit: 3, page: 1, search: searchParam }, { refetchOnMountOrArgChange: true });

  const challengesData = data?.data.challenges;

  const statistics = [
    {
      title: 'Completed Challenges',
      value: data?.data.aggregates.totalCompletedChallenges || 0,
    },
    {
      title: 'Open Challenges',
      value: data?.data.aggregates.totalOpenChallenges || 0,
    },
    {
      title: 'Ongoing Challenges',
      value: data?.data.aggregates.totalOngoingChallenges || 0,
    },
  ];
  const adminStatData = [
    {
      title: 'Total Challenges',
      number: data?.data.aggregates.totalChallenges || 0,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: 15,
    },
    {
      title: 'Total Participants',
      number: 29405,
      icon: <SVGIcon height={20} width={20} Icon={UserGroupIcon} />,
      percentage: 8,
    },
    {
      title: 'Submissions',
      number: 300,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: 5,
    },
    {
      title: 'Subscribed Clients',
      number: 75,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: 12,
    },
    {
      title: 'Notifications Sent',
      number: 980,
      icon: <SVGIcon height={20} width={20} Icon={FlatPaperIcon} />,
      percentage: 20,
    },
  ];
  const session = useSession();
  const user = session.data?.user
  return (
    <div className="px-2">
      <div className="flex flex-wrap max-w-screen-md:text-center justify-between items-center my-6">
        <div>
          <h1 className="text-2xl text-black font-semibold">
            Welcome back {user?.name?.split(' ')[0]},
          </h1>
          <p className="text-primary_grey">
            Build Work Experience through Skills Challenges
          </p>
        </div>
        <Link href={dashboardRoutes.profile.path}>
          <Button className="py-6">
            <Eye />
            View Profile
          </Button>
        </Link>
      </div>
      {!['admin', 'super admin'].includes(
        user?.role?.toLocaleLowerCase() || ''
      ) ? (
        <div className="flex md:gap-10 gap-3 flex-wrap justify-center mx-auto my-10">
          {statistics.map((stat, index) => (
            <TalentStasticsCard
              title={stat.title}
              value={stat?.value?.toString()}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-6 gap-6 my-10">
          {adminStatData.map((card, index) => (
            <div
              key={index}
              className={index < 2 ? 'md:col-span-3' : 'md:col-span-2'}
            >
              <AdminStatCard {...card} />
            </div>
          ))}
        </div>
      )}

      {isLoading || isFetching ? (
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
          isAdmin={['admin', 'super admin'].includes(
            user?.role?.toLowerCase() || ''
          )}
        />
      )}
    </div>
  );
};

export default DashboardPage;
