"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomBreadcrumb from "@/components/common/bread-crumb";
import { dashboardRoutes } from "@/lib/routes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import SVGIcon from "@/components/common/svg";
import { useSelector } from "react-redux";
import { AppState } from "@/lib/types/user";
import {
  ChallengeFeedbackDto,
  useGetChallengeByIdQuery,
} from "@/store/actions/challenge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import SingleChallengeSkeleton from "@/components/common/single-project-skeleton";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
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

const Participants = () => {
  const form = useForm<ChallengeFeedbackDto>({
    resolver: zodResolver(feedbackSubmissionSchema),
    defaultValues: {},
  });

  const participants = [
    {
      id: 1,
      profileImage:
        "https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg",
      fullName: "John Doe",
      occupation: "Product Designer",
    },
    {
      id: 2,
      profileImage:
        "https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg",
      fullName: "Jane Smith",
      occupation: "UX Researcher",
    },
    {
      id: 3,
      profileImage:
        "https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg",
      fullName: "Jane Smith",
      occupation: "UX Researcher",
    },
    {
      id: 4,
      profileImage:
        "https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg",
      fullName: "Jane Smith",
      occupation: "UX Researcher",
    },
    {
      id: 5,
      profileImage:
        "https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg",
      fullName: "Jane Smith",
      occupation: "UX Researcher",
    },
    {
      id: 6,
      profileImage:
        "https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg",
      fullName: "Jane Smith",
      occupation: "UX Researcher",
    },
  ];

  const params = useParams();
  const { toast } = useToast();
  const challengeId = params?.challengeId as string;

  const { data, isLoading } = useGetChallengeByIdQuery(challengeId, {
    skip: !challengeId,
  });

  const project = data?.challenge;

  const user = useSelector((state: AppState) => state?.userReducer?.user);
  const [openSubmission, setOpenSubmission] = useState(false);
  const [editFeedback, setEditFeedback] = useState(false);
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
    setEditFeedback(false);
  };

  if (isLoading)
    return <SingleChallengeSkeleton isAdmin={user.role === "ADMIN"} />;

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
            label: project?.challengeTitle ?? "",
          },
          {
            label: "Participants",
          },
        ]}
      />

      <div className="lg:mx-10 flex md:flex-row flex-col  lg:gap-8 gap-5 my-10">
        <Card className="md:w-full p-6">
          {user.role === "ADMIN" && (
            <Card className="py-6">
              <h2 className="text-xl px-6 font-semibold mb-4">
                Participants{" "}
                <Badge className="text-white">{participants.length}</Badge>
              </h2>
              <div className="space-y-2">
                {participants.slice(0, 5).map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between space-x-4 border-b py-2 px-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 relative rounded-full overflow-hidden">
                        <Image
                          src={participant.profileImage}
                          alt={`${participant.fullName}'s profile`}
                          className="w-full h-full"
                          width={50}
                          height={50}
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{participant.fullName}</p>
                        <p className="text-sm text-gray-500">
                          {participant.occupation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        className="h-8 px-4 text-xs text-primary border-primary"
                        variant={"outline"}
                        onClick={() => setOpenSubmission(true)}
                      >
                        View Submission
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </Card>
      </div>

      <Dialog open={openSubmission} onOpenChange={setOpenSubmission}>
        <DialogContent hideCloseButton={true} className="flex flex-col mx-auto">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-black text-lg font-semibold">
                Submission details
              </h1>
              <h2 className="text-primary_grey text-base">
                View participant&apos;s submission for this Challenge.{" "}
              </h2>
            </div>
          </div>
          <div className="flex items-end justify-between ">
            <h2 className="text-primary_grey text-base">
              Submitted on 3/8/2025{" "}
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

          {editFeedback ? (
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
                      <FormLabel>Leave Feedback </FormLabel>
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
                <Button
                  className="w-full h-12 flex items-center justify-center"
                  disabled={isSubmittingFeedback}
                >
                  {isSubmittingFeedback ? "Saving..." : "Save"}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-1">
              <label htmlFor="additionalNotes" className="font-semibold">
                Feedback
              </label>
              <p className="text-primary_grey text-base" id="feedback">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          )}
          {!editFeedback && (
            <DialogFooter className="flex justify-end">
              <Button
                variant="outline"
                className="text-primary_grey border-primary_grey hover:bg-primary_grey hover:text-white"
                onClick={() => setEditFeedback(!editFeedback)}
              >
                Edit Feedback
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Participants;
