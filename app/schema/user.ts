import { z } from 'zod';
import { User } from '@prisma/client';

export const userForm = z.object({
  name: z.string().min(1, { message: 'Please enter your name.' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email address.' })
    .email('Please enter a valid email address.'),
  age: z
    .string()
    .min(1, {
      message: 'Please enter your age.',
    })
    .refine((age) => Number(age) >= 1, {
      message: 'Age must be a positive number.',
    }),
  custom: z.string().optional(),
  // .transform((val) => Number(val)), // Convert string to number
});

export type FormUser = z.infer<typeof userForm>;
export type DbUser = User;
