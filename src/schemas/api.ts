import { z } from 'zod';

export const EchoRequestSchema = z.object({
  message: z.string().optional(),
  data: z.any().optional(),
});
