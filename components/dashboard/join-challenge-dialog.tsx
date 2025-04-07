import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IProject } from '@/lib/types/project';
import { useJoinChallengeMutation } from '@/store/actions/challenge';
import { handleError } from '@/lib/errorHandler';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DialogTitle } from '@radix-ui/react-dialog';

const emailValidationSchema = z.object({
  emails: z.array(
    z.string().email('Please enter a valid email').min(1, 'Email is required')
  ),
});

interface JoinChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: IProject;
}

const JoinChallengeDialog = ({
  open,
  onOpenChange,
  challenge,
}: JoinChallengeDialogProps) => {
  const [joinChallenge, { isLoading }] = useJoinChallengeMutation();
  const [emails, setEmails] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(emailValidationSchema),
    defaultValues: { emails: emails }
  });

  useEffect(() => {
    if (parseInt(challenge.teamSize) === 3) {
      setEmails(['', '']);
    }
  }, [challenge.teamSize]);

  useEffect(() => {
    reset({ emails });
  }, [emails, reset]);

  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleJoinChallenge = async (data: { emails: string[] }) => {
    try {
      const payload = {
        participants: {
          members: data.emails.length > 0 ? data.emails : [],
        },
      };
      await joinChallenge({ challengeId: challenge._id, payload }).unwrap();
      onOpenChange(false);
      toast({
        title: 'Success 🎉',
        description: 'You have successfully joined the challenge! 🏆',
      });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTitle></DialogTitle>
      <DialogContent
        hideCloseButton={true}
        className="flex flex-col p-10 rounded-lg shadow-xl w-[400px] mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          🚀 Join a team to collaborate and submit your work together!
        </h2>

        <p className="text-lg mb-6 text-center">
          Team up with others, share your skills, and conquer this challenge! 🌟
        </p>

        <form onSubmit={handleSubmit(handleJoinChallenge)}>
          <div className="space-y-4 mb-6">
            {emails.map((email, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Controller
                  control={control}
                  name={`emails.${index}`}
                  render={({ field }) => (
                    <div>
                      <Input
                        type="email"
                        {...field}
                        value={email}
                        onChange={(e) =>
                          handleEmailChange(index, e.target.value)
                        }
                        placeholder={`📧 Team Member ${index + 1} Email`}
                        className="w-full py-2 px-3 rounded-md text-black focus:ring-2 focus:ring-blue-500"
                      />
                      {errors?.emails?.[index] && (
                        <p className="text-red-500 text-sm">
                          {errors.emails[index]?.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-12 mt-4 bg-primary hover:bg-primary/80 text-white rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Joining...' : 'Join Challenge'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinChallengeDialog;
