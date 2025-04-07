import { z } from 'zod';

export const feedbackSubmissionSchema = z.object({
    feedback: z
        .string()
        .min(20, { message: 'Description must be at least 20 characters.' }),
});