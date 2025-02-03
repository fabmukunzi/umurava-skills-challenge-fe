import { z } from 'zod';

export const challengeFormSchema = z.object({
  challengeTitle: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  projectBrief: z
    .string()
    .min(10, { message: 'Project brief must be at least 10 characters.' }),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters.' }),
    categoryId: z
    .string()
    .min(1, { message: 'Please select a category.' }),
  moneyPrize: z.string().min(1, { message: 'Enter a valid prize amount.' }),
  submissionLink: z.string().url({ message: 'Enter a valid URL.' }),
  deadline: z
    .date({ required_error: 'Deadline is required.' })
    .refine((date) => date >= new Date(), {
      message: 'Deadline must be in the future.',
    }),

  startDate: z
    .date({ required_error: 'Start date is required.' })
    .refine((date) => date >= new Date(), {
      message: 'Start date must be in the future.',
    }),

  contactEmail: z.string().email({ message: 'Enter a valid email.' }),
  skills: z
    .array(z.string())
    .min(1, { message: 'Select at least one skill.' })
    .refine((val) => val.length > 0, { message: 'Skills are required.' }),
  seniority: z
  .array(z.string())
  .min(1, { message: 'Please select a seniority level.' })
  .refine((val) => val.length > 0, { message: 'seniority is required.' })
});

export type ChallengeFormData = z.infer<typeof challengeFormSchema>;
