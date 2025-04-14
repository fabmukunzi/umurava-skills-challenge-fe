'use client';

import CustomBreadcrumb from '@/components/common/bread-crumb';
import SingleChallengeSkeleton from '@/components/common/single-project-skeleton';
import SVGIcon from '@/components/common/svg';
import CalendarIcon from '@/components/common/svg/calendar-icon';
import DollarIcon from '@/components/common/svg/dollar-icon';
import GiftBoxIcon2 from '@/components/common/svg/giftbox-icon2';
import MailIcon from '@/components/common/svg/mail-icon';
import JoinChallengeDialog from '@/components/dashboard/join-challenge-dialog';
import KeyInstruction from '@/components/dashboard/key-instruction-card';
import SubmitChallengeDialog from '@/components/dashboard/submit-challenge-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { challengeSubmissionSchema } from '@/lib/challenge-form-validation';
import { handleError } from '@/lib/errorHandler';
import { UmuravaWhiteLogo } from '@/lib/images';
import { homepageRoutes } from '@/lib/routes';
import {
  SubmitChallengeDto,
  useGetPublicChallengeByIdQuery,
  useSubmitChallengeMutation,
} from '@/store/actions/challenge';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const HomeSingleProjectView = () => {
  const form = useForm<SubmitChallengeDto>({
    resolver: zodResolver(challengeSubmissionSchema),
    defaultValues: {},
  });

  const params = useParams();
  const challengeId = params?.challengeId as string;

  const { data, isLoading } = useGetPublicChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });
  const [submitChallenge, { isLoading: isSubmitting }] =
    useSubmitChallengeMutation();
  const project = data?.data;

  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const isProjectNotStarted = dayjs().isBefore(
    dayjs(project?.startDate || dayjs())
  );

  const onSubmit = async (values: SubmitChallengeDto) => {
    try {
      await submitChallenge({
        id: challengeId,
        data: values,
      }).unwrap();
      toast({
        title: 'Success',
        description: 'Your submission has been sent successfully.',
      });
      setOpenSubmitDialog(false);
    } catch (error) {
      handleError(error);
    } finally {
      form.reset();
    }
  };

  const statusStyles: Record<string, string> = {
    draft: 'bg-gray-500 text-white',
    open: 'bg-blue-100 text-blue-600',
    ongoing: 'bg-yellow-300 text-yellow-800',
    closed: 'bg-red-300 text-red-800',
    completed: 'bg-green-700 text-white',
  };

  if (isLoading) return <SingleChallengeSkeleton />;

  return (
    <div className="w-11/12 mx-auto">
      <CustomBreadcrumb
        className="md:mx-10 py-4"
        items={[
          {
            label: 'Challenges & Hackathons',
            href: homepageRoutes.challengeHackathons.path,
          },
          {
            label: project?.challengeName ?? '',
          },
        ]}
      />

      <div className="lg:mx-10 flex md:flex-row flex-col  lg:gap-12 gap-5 my-10">
        <Card className="md:w-8/12 p-6">
          <div className="relative bg-primary h-80 flex items-center justify-center rounded-lg mb-6">
            <Image src={UmuravaWhiteLogo} alt="Umarava Logo" />
            <Badge
              variant="secondary"
              className={`absolute top-2 font-medium right-2 px-5 py-1.5 rounded-xl ${
                statusStyles[project?.status || ''] || 'bg-gray-200 text-black'
              }`}
            >
              {project?.status}
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold my-1">
            {project?.challengeName}
          </h1>
          {/* <p className="text-gray-700 mb-6">{project?.projectBrief}</p> */}

          {/* <h2 className="text-xl font-semibold mt-6 mb-4">Tasks:</h2> */}
          {project?.projectDescription && (
            <div
              className="prose prose-blue max-w-none prose-li:my-0 prose-a:no-underline"
              dangerouslySetInnerHTML={{ __html: project.projectDescription }}
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
                value={project?.challengeCategory ?? ''}
              />
              <KeyInstruction
                icon={<SVGIcon height={23} width={23} Icon={CalendarIcon} />}
                title="Duration"
                value={project?.duration?.toString() + ' Days' || ''}
              />
              {Array.isArray(project?.moneyPrize) &&
                project.moneyPrize.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      🏆 Prize Pool
                    </h2>
                    <div className="space-y-4">
                      {project?.moneyPrize.map((prize) => (
                        <Card
                          key={prize._id}
                          className="flex justify-between items-center px-3 py-2 border border-dashed border-primary bg-muted/30 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/20 text-primary flex justify-center items-center h-9 w-9 rounded-full">
                              <SVGIcon
                                height={20}
                                width={20}
                                Icon={DollarIcon}
                              />
                            </div>
                            <span className="font-medium text-sm text-muted-foreground">
                              {prize.categoryPrize}
                            </span>
                          </div>
                          <span className="font-semibold text-primary">
                            {prize.prize.toLocaleString()} {prize?.currency}
                          </span>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            <Button
              className="w-full h-12"
              disabled={
                project?.status === 'open' || dayjs().isAfter(project?.endDate)
              }
              onClick={() => {
                if (isProjectNotStarted) {
                  setOpenJoinDialog(!openJoinDialog);
                } else {
                  setOpenSubmitDialog(!openSubmitDialog);
                }
              }}
            >
              {isProjectNotStarted ? 'Join Challenge' : 'Submit Your Work'}
            </Button>
          </Card>
        </div>
      </div>
      <SubmitChallengeDialog
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        open={openSubmitDialog}
        onOpenChange={setOpenSubmitDialog}
      />
      {project && (
        <JoinChallengeDialog
          open={openJoinDialog}
          onOpenChange={setOpenJoinDialog}
          challenge={project}
        />
      )}
    </div>
  );
};

export default HomeSingleProjectView;
