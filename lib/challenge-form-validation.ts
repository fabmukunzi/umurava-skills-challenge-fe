import { z } from 'zod';

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
export const challengeSubmissionSchema = z.object({
  submissionLink: z.string().url({ message: 'Enter a valid URL.' }),
  description: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters.' }),
});

export const challengeFormSchema = z.object({
  challengeName: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters.' }),
  projectDescription: z
    .string()
    .min(20, { message: 'Description must be at least 20 characters.' }),
  challengeCategory: z
    .string()
    .min(1, { message: 'Please select a category.' }),
  moneyPrize: z
    .array(
      z.object({
        categoryPrize: z
          .string()
          .min(1, { message: 'Enter a category prize.' }),
        prize: z.union([
          z.string().min(1, { message: 'Enter a valid prize amount.' }),
          z.number().min(1, { message: 'Enter a valid prize amount.' }),
        ]),
      })
    )
    .min(1, { message: 'At least one prize is required.' }),
  startDate: z.union([
    z.string().regex(dateRegex, {
      message: 'Start date must be in DD-MM-YYYY format.',
    }),
    z.date(),
  ]),
  endDate: z.union([
    z.string().regex(dateRegex, {
      message: 'End date must be in DD-MM-YYYY format.',
    }),
    z.date(),
  ]),
  teamSize: z
    .string({ required_error: 'Team size is required' })
    .min(1, 'Team must have at least 1 member'),
  contactEmail: z.string().email({ message: 'Enter a valid email.' }),
  skills: z.array(z.string()).min(1, { message: 'Select at least one skill.' }),
  levels: z
    .array(z.string())
    .min(1, { message: 'Please select a seniority level.' }),
});

export type ChallengeFormData = z.infer<typeof challengeFormSchema>;
