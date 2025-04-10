"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomBreadcrumb from "@/components/common/bread-crumb";
import { dashboardRoutes } from "@/lib/routes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import SVGIcon from "@/components/common/svg";
import {
  ChallengeFeedbackDto,
  useGetChallengeByIdQuery,
  useGetParticipantsByChallengeIdQuery,
} from "@/store/actions/challenge";
import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SingleChallengeSkeleton from "@/components/common/single-project-skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { feedbackSubmissionSchema } from "@/lib/feedback-form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LinkIcon } from "@/components/common/svg/link-icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";

const Participants = () => {
  const form = useForm<ChallengeFeedbackDto>({
    resolver: zodResolver(feedbackSubmissionSchema),
    defaultValues: {},
  });

  const params = useParams();
  const { toast } = useToast();
  const challengeId = params?.challengeId as string;
  const session = useSession();
  const user = session.data?.user;

  const { data, isLoading } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });
  const project = data?.data;

  const { data: participantsData, isLoading: participantsLoading } =
    useGetParticipantsByChallengeIdQuery({ challengeId, page: 1, limit: 5 });

  const participants = useMemo(() =>
    participantsData?.data?.participantChallenges || [],
    [participantsData?.data?.participantChallenges]
  );

  const [openSubmission, setOpenSubmission] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<any>(null);

  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const handleEditFeedback = async (data: ChallengeFeedbackDto) => {
    console.log("Feedback data:", data);
    setIsSubmittingFeedback(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "Feedback updated successfully",
        description: "Your feedback has been updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating feedback",
        description: error?.data?.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  console.log('selectedParticipant', selectedParticipant)

  if (participantsLoading)
    return <SingleChallengeSkeleton isAdmin={user?.role === "admin"} />;

  return (
    <div>
      <CustomBreadcrumb
        className="md:mx-10 py-4"
        items={[
          {
            label: "Challenges & Hackathons",
            href: dashboardRoutes.challengeHackathons.path,
          },
          {
            label: project?.challengeName ?? "",
          },
          {
            label: "Participants",
          },
        ]}
      />

      <div className="lg:mx-10 flex md:flex-row flex-col  lg:gap-8 gap-5 my-10">
        <Card className="md:w-full p-6">
          {user?.role === "admin" && (
            <Card className="py-6">
              <h2 className="text-xl px-6 font-semibold mb-4">
                {project?.challengeName} Participants{" "}
                <Badge className="text-white">{participants.length}</Badge>
              </h2>
              <div className="space-y-2">
                {participants.slice(0, 5).map((participant) => (
                  <div
                    key={participant?._id}
                    className="flex items-center justify-between space-x-4 border-b py-2 px-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 relative rounded-full overflow-hidden">
                        <Image
                          src={participant.teamLead?.profile_url ?? ""}
                          alt={`${participant?.teamLead?.names}'s profile`}
                          className="w-full h-full"
                          width={50}
                          height={50}
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{participant?.teamLead?.names}</p>
                        <p className="text-sm text-gray-500">
                          {participant?.teamLead?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="text-white bg-[#2B71F0] capitalize">
                        {participant?.submissionStatus}
                      </Badge>
                      {participant?.submissionData && (<Button
                        className="h-8 text-sm "
                        variant={"outline"}
                        onClick={() => {
                          setSelectedParticipant(participant);
                          setOpenSubmission(true)
                        }}
                      >
                        View Submission
                      </Button>)}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Card>
      </div>

      <Dialog open={openSubmission} onOpenChange={setOpenSubmission}>
        {isLoading && <SingleChallengeSkeleton isAdmin={user?.role === "admin"} />}
        <DialogContent hideCloseButton={true} className="flex flex-col mx-auto">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-black text-lg font-semibold">
                Submission details
              </h1>
              <h2 className="text-primary_grey text-base">
                View participant&apos;s submission {project?.challengeName} Challenge.{" "}
              </h2>
            </div>
          </div>
          <div className="flex items-end justify-between ">
            <h2 className="text-primary_grey text-base">
              Submitted on {project?.submissionDate}
            </h2>
            <Badge className="text-white bg-[#2B71F0] mt-4">{"Reviewed"}</Badge>
          </div>

          <div className="space-y-1">
            <label htmlFor="projectUrl" className="font-semibold">
              Project URL
            </label>
            <div className="flex items-center gap-2" id="projectUrl">
              <SVGIcon color="#2B71F0" Icon={LinkIcon} />
              <Link
                href="#"
                className="text-primary text-base hover:underline hover:text-[#2B71F0]"
              >
                Sign up
              </Link>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="additionalNotes" className="font-semibold">
              Additional Notes
            </label>
            <p className="text-primary_grey text-base" id="additionalNotes">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              cumque sunt adipisci praesentium, porro maxime quasi reiciendis
              beatae nemo minus natus deleniti odit autem nostrum neque
              consectetur velit iure harum!
            </p>
          </div>

          <Form {...form}>
            <form
              className="space-y-2 md:space-y-4"
              onSubmit={form.handleSubmit(handleEditFeedback)}
            >
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Feedback </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any submission feedback or comments here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  className="flex items-center justify-center bg-red-600 hover:bg-red-500"
                  disabled={isSubmittingFeedback}
                >
                  {isSubmittingFeedback ? "Rejecting..." : "Reject"}
                </Button>

                <Button
                  className=" flex items-center justify-center"
                  disabled={isSubmittingFeedback}
                >
                  {isSubmittingFeedback ? "Promoting..." : "Promote"}
                </Button>
              </div>

            </form>
          </Form>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Participants;
