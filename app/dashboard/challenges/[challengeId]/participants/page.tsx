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
  SubmitChallengeDto,
  useApproveSubmissionMutation,
  useGetChallengeByIdQuery,
  useGetParticipantsByChallengeIdQuery,
  useRejectSubmissionMutation,
} from "@/store/actions/challenge";
import { useMemo, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SingleChallengeSkeleton from "@/components/common/single-project-skeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { LinkIcon } from "@/components/common/svg/link-icon";
import { useSession } from "next-auth/react";
import dayjs from "dayjs";
import { LucideLoader2 } from "lucide-react";

const Participants = () => {

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
  const [rejectSubmission, { isLoading: isRejecting }] = useRejectSubmissionMutation();
  const [approveSubmission, { isLoading: isApproving }] = useApproveSubmissionMutation();

  const participants = useMemo(() =>
    participantsData?.data?.participantChallenges || [],
    [participantsData?.data?.participantChallenges]
  );

  const [openSubmission, setOpenSubmission] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<SubmitChallengeDto | null>(null);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const isApproved = useMemo(
    () => participants?.find((participant) => participant._id === submissionId)?.submissionStatus === "approved",
    [participants, submissionId]
  );
  const isRejected = useMemo(
    () => participants?.find((participant) => participant._id === submissionId)?.submissionStatus === "rejected",
    [participants, submissionId]
  );

  const handleRejectApprove = async (data: ChallengeFeedbackDto) => {
    try {
      if (data.status === "approved") {
        await approveSubmission({
          submissionId: data.submissionId as string,
          status: data.status,
        }).unwrap();
      }
      if (data.status === "rejected") {
        await rejectSubmission({
          submissionId: data.submissionId as string,
          status: data.status,
        }).unwrap();
      }
      setOpenSubmission(false);
      setSelectedParticipant(null);
      setSubmissionId(null);
      toast({
        title: "Success",
        description: "Submission status updated successfully",
      });
    } catch (error: any) {
      toast({
        title: `${data.status} submission failed`,
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  };

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
                {participants.map((participant) => (
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
                        <p className="font-medium capitalize">{participant?.teamLead?.names}</p>
                        <p className="text-sm text-gray-500">
                          {participant?.teamLead?.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`text-white capitalize ${{
                          'approved': 'bg-green-500',
                          'rejected': 'bg-red-500',
                          'submitted': 'bg-primary',
                          'not submitted': 'bg-gray-500'
                        }[participant?.submissionStatus] || 'bg-[#2B71F0]'
                          }`}
                      >
                        {participant?.submissionStatus}
                      </Badge>

                      <div className="flex items-center gap-2 my-4">
                        <h2 className="text-primary_grey text-base">
                          {participant?.submissionDate && <>Submitted:  {dayjs(participant?.submissionDate).format("YYYY-MM-DD HH:mm A")}</>}
                        </h2>
                      </div>
                      {participant?.submissionData && (<Button
                        className="h-8 text-sm "
                        variant={"outline"}
                        onClick={() => {
                          setSubmissionId(participant?._id);
                          setSelectedParticipant(participant?.submissionData as unknown as SubmitChallengeDto);
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

          <div className="space-y-1">
            <label htmlFor="projectUrl" className="font-semibold">
              Project URL
            </label>
            {selectedParticipant?.links?.map((item, index: number) => (
              <div key={index} className="flex items-center gap-2" id="projectUrl">
                <SVGIcon color="#2B71F0" Icon={LinkIcon} />
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-base hover:underline hover:text-[#2B71F0]"
                >
                  {item.description}
                </Link>
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label htmlFor="additionalNotes" className="font-semibold">
              Additional Notes
              <p className="text-primary_grey text-base font-normal" id="additionalNotes">
                {selectedParticipant?.details_message || "No additional notes provided."}
              </p>
            </label>
          </div>
          <div className="flex items-center justify-end gap-2">
            {!isRejected && (<Button
              className="flex items-center justify-center bg-red-600 hover:bg-red-500"
              disabled={isRejecting}
              onClick={() => handleRejectApprove({ status: "rejected", submissionId: submissionId as string })}
            >
              {isRejecting ? <LucideLoader2 className="animate-spin" /> : "Reject"}
            </Button>)}

            {!isApproved && (<Button
              className=" flex items-center justify-center"
              disabled={isApproving}
              onClick={() => handleRejectApprove({ status: "approved", submissionId: submissionId as string })}
            >
              {isApproving ? <LucideLoader2 className="animate-spin" /> : "Approve"}
            </Button>)}
          </div>

        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Participants;
