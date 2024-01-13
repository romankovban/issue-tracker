import { z } from 'zod';

export const createIssueDto = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().min(1, 'Description is required').max(65535),
});

export type CreateIssueDto = z.infer<typeof createIssueDto>;

export const updateIssueDto = z.object({
  title: z.string().min(1, 'Title is required.').max(255).optional(),
  description: z
    .string()
    .min(1, 'Description is required.')
    .max(65535)
    .optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).default('OPEN'),
  assignedToUserId: z
    .string()
    .min(1, 'AssignedToUserId is required.')
    .max(255)
    .optional()
    .nullable(),
});

export type UpdateIssueDto = z.infer<typeof updateIssueDto>;
