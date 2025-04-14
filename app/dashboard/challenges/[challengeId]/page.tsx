/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useParams, useRouter } from 'next/navigation';
import SVGIcon from '@/components/common/svg';
import MailIcon from '@/components/common/svg/mail-icon';
import GiftBoxIcon2 from '@/components/common/svg/giftbox-icon2';
import DollarIcon from '@/components/common/svg/dollar-icon';
import CalendarIcon from '@/components/common/svg/calendar-icon';
import {
  SubmitChallengeDto,
  useDeleteChallengeMutation,
  useGetChallengeByIdQuery,
  useGetParticipantsByChallengeIdQuery,
  useSubmitChallengeMutation,
  useUpdateChallengeStatusMutation,
} from '@/store/actions/challenge';
import { useMemo, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import SingleChallengeSkeleton from '@/components/common/single-project-skeleton';
import { useForm } from 'react-hook-form';
import { challengeSubmissionSchema } from '@/lib/challenge-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { handleError } from '@/lib/errorHandler';
import { toast } from '@/hooks/use-toast';
import SubmitChallengeDialog from '@/components/dashboard/submit-challenge-dialog';
import JoinChallengeDialog from '@/components/dashboard/join-challenge-dialog';
import { Alert } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';
import dayjs from 'dayjs';

const ITEMS_PER_PAGE = 100;
const SingleChallengePage = () => {
  const form = useForm<SubmitChallengeDto>({
    resolver: zodResolver(challengeSubmissionSchema),
    defaultValues: {},
  });

  const router = useRouter();
  const params = useParams();
  const session = useSession();
  const user = session.data?.user;
  const isAdmin = useMemo(
    () => ['admin', 'super admin'].includes((user?.role || '').toLowerCase()),
    [user?.role]
  );
  const challengeId = params?.challengeId as string;

  const { data, isLoading } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });

  const project = data?.data;
  const isSubmissionNear = useMemo(() => {
    if (project?.submissionDate) {
      const currentDate = dayjs();
      const submissionDate = dayjs(project.submissionDate);
      const daysDiff = submissionDate.diff(currentDate, 'day');
      return daysDiff <= 3 && daysDiff >= 0;
    }
    return false;
  }, [project?.submissionDate]);

  const { data: participantsData, isLoading: participantsLoading } =
    useGetParticipantsByChallengeIdQuery({
      challengeId,
      page: 1,
      limit: ITEMS_PER_PAGE,
    });

  const participants = useMemo(
    () => participantsData?.data?.participantChallenges || [],
    [participantsData?.data?.participantChallenges]
  );

  const [submitChallenge, { isLoading: isSubmitting }] =
    useSubmitChallengeMutation();

  const [deleteChallenge] = useDeleteChallengeMutation();
  const [updateChallengeStatus, { isLoading: updatingChallenge }] =
    useUpdateChallengeStatusMutation();

  const [isDeleting, setIsDeleting] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);
  const [openJoinDialog, setOpenJoinDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteChallenge(challengeId).unwrap();
      router.push(dashboardRoutes.challengeHackathons.path);
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onStatusChange = async (status: string) => {
    try {
      await updateChallengeStatus({
        id: challengeId,
        status: status,
      }).unwrap();
      toast({
        title: 'Challenge updated successfully',
      });
    } catch (err) {
      handleError(err);
    }
  };

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

  if (isLoading)
    return (
      <SingleChallengeSkeleton
        isAdmin={['admin', 'super admin'].includes(
          user?.role?.toLocaleLowerCase() || ''
        )}
      />
    );

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
            label: project?.challengeName ?? '',
          },
        ]}
      />

      <div className="lg:mx-10 flex md:flex-row flex-col  lg:gap-8 gap-5 my-10">
        <Card className="md:w-8/12 p-6">
          <div className="relative bg-primary h-80 flex items-center justify-center rounded-lg mb-6">
            <Image src={UmuravaWhiteLogo} alt="Umarava Logo" />
          </div>

          {project?.projectDescription && (
            <div
              className="prose prose-blue max-w-none prose-li:my-0 prose-a:no-underline"
              dangerouslySetInnerHTML={{ __html: project.projectDescription }}
            />
          )}
        </Card>

        <div className="lg:w-5/12 md:w-6/12 h-fit">

          <Card className="p-6 mb-6">

            {project?.status === 'closed' && <Alert isShow={showAlert} variant='warning' title="Challenge closed" description={'Challenge has been closed.'} onClose={() => setShowAlert(false)} />}

            {project?.status === 'completed' && <Alert isShow={showAlert} variant='info' title="Challenge completed" description={'Challenge has been completed.'} onClose={() => setShowAlert(false)} />}

            {project?.submissionStatus === 'submitted' && <Alert isShow={showAlert} variant='success' title="In Review ✅" description={'Your submission is currently being reviewed.'} onClose={() => setShowAlert(false)} />}

            {project?.submissionStatus === 'not submitted' && isSubmissionNear && <Alert isShow={showAlert} variant='warning' title="Friendly Reminder" description={'You are nearing submission deadline.'} onClose={() => setShowAlert(false)} />}

            {project?.submissionStatus === 'approved' && <Alert isShow={showAlert} variant='success' title="Congratulations 🚀" description={'Your submission have been selected onto the next stage.'} onClose={() => setShowAlert(false)} />}

            {project?.submissionStatus === 'rejected' && <Alert isShow={showAlert} variant='error' title="Not Selected 😞" description={'Your submission was not selected. Thank you for participating. Stay tuned in for more future challenges'} onClose={() => setShowAlert(false)} />}

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
                value={project?.duration + ' Days'}
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
            {isAdmin ? (
              <div className="space-y-4 mt-5">
                <div className="flex w-full gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className='w-full' disabled={isDeleting}>
                        {isDeleting ? <Loader2 className='animate-spin' /> : 'Delete'}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the challenge and remove its data.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-red-500"
                        >
                          Yes, delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Link className="w-full" href={`${dashboardRoutes.challengeHackathons.path}/${challengeId}/edit`}>
                    <Button className="w-full">Edit</Button>
                  </Link>
                </div>
              </div>
            ) : project?.joined_status && !['rejected', 'approved', "submitted"].includes(project?.submissionStatus?.toLowerCase() || '') &&
              !['closed', 'completed'].includes(project?.status?.toLowerCase() || '') ? (
              <Button className="w-full" onClick={() => setOpenSubmitDialog(prev => !prev)}>
                Submit Your Work
              </Button>
            ) : !project?.joined_status && !['closed', 'completed'].includes(project?.status?.toLowerCase() || '') ? (
              <Button className="w-full" onClick={() => setOpenJoinDialog(prev => !prev)}>
                Join Challenge
              </Button>
            ) : (
              ''
            )}
          </Card>

          {isAdmin && (<Card className="mb-5">
            <div className="w-full h-full shadow-none p-4">
              <div>
                <h1 className="text-xl font-semibold">Challenge Settings</h1>
                <p className="text-gray-500">Manage your challenge (Complete, Close and re-open challenge).</p>

                <div className='flex items-center gap-2 mt-4'>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {['ongoing', 'open'].includes(project?.status?.toLowerCase() || '') ? (<Button className="w-full danger-btn-outline" variant={'outline'} disabled={updatingChallenge}>
                        Close
                      </Button>) : (<Button className="w-full primary-btn-outline" variant={'outline'} disabled={updatingChallenge}>
                        Re-open
                      </Button>)}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          change challenge status to closed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onStatusChange('closed')} className="bg-red-500 hover:bg-red-500/70"
                        >
                          {updatingChallenge ? (
                            <>
                              <Loader2 className="animate-spin w-5 h-5 mr-2" />
                            </>
                          ) : (
                            'Yes, Close'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {!['completed', 'closed', 'open'].includes(project?.status?.toLowerCase() || '') && (<Button className="w-full primary-btn-outline" variant={'outline'} disabled={updatingChallenge}>
                        Complete
                      </Button>)}
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          change challenge status to completed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onStatusChange('completed')}
                        >
                          {updatingChallenge ? (
                            <>
                              <Loader2 className="animate-spin w-5 h-5 mr-2" />
                            </>
                          ) : (
                            'Yes, Complete'
                          )}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </Card>
          )}

          {['admin', 'super admin'].includes(
            user?.role?.toLocaleLowerCase() || ''
          ) &&
            !participantsLoading && (
              <ParticipantsCard participants={participants} />
            )}
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

export default SingleChallengePage;
