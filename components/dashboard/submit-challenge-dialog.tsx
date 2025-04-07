import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { SubmitChallengeDto } from '@/store/actions/challenge';
import { zodResolver } from '@hookform/resolvers/zod';
import { challengeSubmissionSchema } from '@/lib/challenge-form-validation';

interface SubmitChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: SubmitChallengeDto) => Promise<void>;
  isSubmitting: boolean;
}

const SubmitChallengeDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: SubmitChallengeDialogProps) => {
  const form = useForm<SubmitChallengeDto>({
    resolver: zodResolver(challengeSubmissionSchema),
    defaultValues: {},
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton={false} className="flex flex-col mx-auto">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-black text-lg font-semibold">Submit Your Work</h1>
        </div>
        <h2 className="text-primary_grey text-base">
          Submit your work and provide either a Github repository URL or Google
          drive link.
        </h2>
        <ul className="list-disc text-left text-primary_grey *:text-base px-4 md:px-8">
          <li>For public repositories: Share the Github URL</li>
          <li>
            For private repositories: provide a Google drive link with view
            access.
          </li>
          <li>
            Share the file/folder with{' '}
            <span className="font-semibold">team@umurava.africa</span> (Note:
            Ensure <span className="font-semibold">Viewer</span> access is
            granted).
          </li>
        </ul>
        <Form {...form}>
          <form
            className="space-y-2 md:space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            <Button
              className="w-full h-12 flex items-center justify-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SubmitChallengeDialog;
