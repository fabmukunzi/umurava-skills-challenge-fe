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
} from '@/store/actions/challenge';
import { getChallengeDuration } from '@/lib/get-challenge-duration';
import { useState } from 'react';
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
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { challengeSubmissionSchema } from '@/lib/challenge-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { CloseIcon } from '@/components/common/svg/close-icon';

const SingleChallengePage = () => {
  const form = useForm<SubmitChallengeDto>({
    resolver: zodResolver(challengeSubmissionSchema),
    defaultValues: {},
  });

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

  const router = useRouter();
  const params = useParams();
  const challengeId = params?.challengeId as string;

  const { data, isLoading } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });

  const project = data?.data;

  const { data: partcipantsData, isLoading: partcipantsLoading } =
    useGetParticipantsByChallengeIdQuery({ challengeId, page: 1, limit: 5 });

  const participants = partcipantsData?.data.participantChallenges || [];

  const session = useSession();
  const user = session.data?.user;

  const [deleteChallenge] = useDeleteChallengeMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteChallenge(challengeId).unwrap();
      router.push(dashboardRoutes.challengeHackathons.path);
    } catch (error) {
      handleError(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (data: SubmitChallengeDto) => {
    setIsSubmitting(true);
    console.log('data', data);
    try {
      toast({
        title: 'Success',
        description: 'Your submission has been sent successfully.',
      });
      setOpenSubmitDialog(false);
    } catch (error: any) {
      toast({
        title: 'Something went wrong',
        variant: 'destructive',
        description: error?.data?.message,
      });
    } finally {
      setIsSubmitting(false);
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
          {/* <h1 className="text-2xl font-semibold my-1">
            {project?.challengeName}
          </h1>
          <p className="text-gray-700 mb-6">{project?.projectDescription}</p> */}

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
                value={
                  project?.startDate && project?.endDate
                    ? `${getChallengeDuration(
                      new Date(project.startDate),
                      new Date(project.deadline)
                    )} Days`
                    : 'N/A'
                }
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
                            {prize.prize.toLocaleString()} $
                          </span>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
            </div>
            {['admin', 'super admin'].includes(
              user?.role?.toLocaleLowerCase() || ''
            ) ? (
              <div className="flex w-full mt-5 gap-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-full h-12 bg-red-500"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
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
                <Link
                  className="w-full"
                  href={`${dashboardRoutes.challengeHackathons.path}/${challengeId}/edit`}
                >
                  <Button className="w-full h-12">Edit</Button>
                </Link>
              </div>
            ) : (
              <Button className="w-full h-12" onClick={() => setOpenSubmitDialog(!openSubmitDialog)}>Submit Your Work</Button>
            )}
          </Card>

          {['admin', 'super admin'].includes(
            user?.role?.toLocaleLowerCase() || ''
          ) &&
            !partcipantsLoading && (
              <ParticipantsCard participants={participants} />
            )}
        </div>
      </div>

      <Dialog open={openSubmitDialog} onOpenChange={setOpenSubmitDialog}>
        <DialogContent
          hideCloseButton={true}
          className="flex flex-col mx-auto"
        >
          <div className='flex items-center justify-between gap-2'>
            <h1 className="text-black text-lg font-semibold">
              Submit Your Work
            </h1>
            <div onClick={() => setOpenSubmitDialog(false)} className='cursor-pointer hover:text-[#2B71F0] text-white border border-[#2B71F0] rounded-full p-2'>
              <SVGIcon
                color={`#2B71F0`}
                className="!size-5"
                Icon={CloseIcon}
              /></div>
          </div>
          <h2 className="text-primary_grey text-base">
            Submit your work and provide either a Github repository URL or Google drive link.
          </h2>
          <ul className='list-disc text-left text-primary_grey *:text-base px-4 md:px-8'>
            <li>For public reposities: Share the Github URL</li>
            <li>For private repositories: provide a Googlr drive link with view access.</li>
            <li>Share the file/folder with <span className='font-semibold'>team@umurava.africa</span> (Note: Ensure <span className='font-semibold'>Viewer</span> access is granted).</li>
          </ul>
          <Form {...form}>
            <form className='space-y-2 md:space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="submissionLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project URL</FormLabel>
                    <FormControl>
                      <Input
                        className="h-12"
                        placeholder="Enter your project URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional notes or comments here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full h-12 flex items-center justify-center" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div >
  );
};

export default SingleChallengePage;
