'use client';

import CustomBreadcrumb from '@/components/common/bread-crumb';
import KeyInstruction from '@/components/dashboard/key-instruction-card';
import { UmuravaWhiteLogo } from '@/lib/images';
import { dashboardRoutes } from '@/lib/routes';
import Image from 'next/image';
import ParticipantsCard from '@/components/dashboard/participants';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import SVGIcon from '@/components/common/svg';
import MailIcon from '@/components/common/svg/mail-icon';
import GiftBoxIcon2 from '@/components/common/svg/giftbox-icon2';
import DollarIcon from '@/components/common/svg/dollar-icon';
import CalendarIcon from '@/components/common/svg/calendar-icon';
import { useSelector } from 'react-redux';
import { AppState } from '@/lib/types/user';
import { useGetChallengeByIdQuery } from '@/store/actions/challenge';
import { getChallengeDuration } from '@/lib/get-challenge-duration';

const SingleChallengePage = () => {
  const participants = [
    {
      id: 1,
      profileImage:
        'https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg',
      fullName: 'John Doe',
      occupation: 'Product Designer',
    },
    {
      id: 2,
      profileImage:
        'https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg',
      fullName: 'Jane Smith',
      occupation: 'UX Researcher',
    },
    {
      id: 3,
      profileImage:
        'https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg',
      fullName: 'Jane Smith',
      occupation: 'UX Researcher',
    },
    {
      id: 4,
      profileImage:
        'https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg',
      fullName: 'Jane Smith',
      occupation: 'UX Researcher',
    },
    {
      id: 5,
      profileImage:
        'https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg',
      fullName: 'Jane Smith',
      occupation: 'UX Researcher',
    },
    {
      id: 6,
      profileImage:
        'https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg',
      fullName: 'Jane Smith',
      occupation: 'UX Researcher',
    },
  ];

  const params = useParams();
  const challengeId = params?.challengeId as string;

  const { data } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });

  const project = data?.challenge;

  const user = useSelector((state: AppState) => state?.userReducer?.user);

  return (
    <div>
      <CustomBreadcrumb
        className="md:mx-10 py-4"
        items={[
          {
            label: 'Challenges & Hackathons',
            href: dashboardRoutes.challengeHackathons.path,
          },
          {
            label: project?.challengeTitle ?? '',
          },
        ]}
      />

      <div className="lg:mx-10 flex md:flex-row flex-col  lg:gap-8 gap-5 my-10">
        <Card className="md:w-8/12 p-6">
          <div className="relative bg-primary h-80 flex items-center justify-center rounded-lg mb-6">
            <Image src={UmuravaWhiteLogo} alt="Umarava Logo" />
          </div>
          <h1 className="text-2xl font-semibold my-1">
            {project?.challengeTitle}
          </h1>
          <p className="text-gray-700 mb-6">{project?.projectBrief}</p>

          <h2 className="text-xl font-semibold mt-6 mb-4">Tasks:</h2>
          {project?.description && (
            <div
              className="prose prose-blue max-w-none prose-li:my-0 prose-a:no-underline"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          )}
        </Card>

        <div className="lg:w-5/12 md:w-6/12 h-fit">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Key Instructions</h2>
            <p className="my-2">
              You are free to schedule a clarification call with the team via
              the information below.
            </p>

            <div className="space-y-6 my-10">
              <KeyInstruction
                icon={<SVGIcon height={23} width={23} Icon={MailIcon} />}
                title="Contact Email"
                value={project?.contactEmail ?? ''}
              />
              <KeyInstruction
                icon={<SVGIcon height={23} width={23} Icon={GiftBoxIcon2} />}
                title="Challenge Category"
                value={project?.category?.title ?? ''}
              />
              <KeyInstruction
                icon={<SVGIcon height={23} width={23} Icon={CalendarIcon} />}
                title="Duration"
                value={`${getChallengeDuration(
                  project?.startDate || new Date().toISOString(),
                  project?.deadline || new Date().toISOString()
                )} Days`}
              />
              <KeyInstruction
                icon={<SVGIcon height={23} width={23} Icon={DollarIcon} />}
                title="Money Prize"
                value={project?.moneyPrize ?? ''}
              />
            </div>
            {user.role === 'ADMIN' ? (
              <div className="flex w-full mt-5 gap-6">
                <Button className="w-full h-12 bg-red-500">Delete</Button>
                <Link
                  className="w-full"
                  href={`${dashboardRoutes.challengeHackathons.path}/${challengeId}/edit`}
                >
                  <Button className="w-full h-12">Edit</Button>
                </Link>
              </div>
            ) : (
              <Link
                className="w-full"
                href={project?.submissionLink ?? ''}
                target="blank"
              >
                <Button className="w-full h-12">Submit Your Work</Button>
              </Link>
            )}
          </Card>

          {user.role === 'ADMIN' && (
            <ParticipantsCard participants={participants} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleChallengePage;
