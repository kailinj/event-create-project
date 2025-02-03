import { z } from 'zod';

export const userForm = z.object({
  name: z.string().min(1, { message: 'Please enter your name.' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email address.' })
    .email('Please enter a valid email address.'),
  age: z
    .number({ coerce: true })
    .min(1, {
      message: 'Please enter your age.',
    })
    .refine((age) => Number(age) >= 1, {
      message: 'Age must be a positive number.',
    }),
  custom: z.string().optional(),
});

export type User = {
  id?: number;
  name: string;
  email: string;
  age: number;
  custom?: unknown;
  createdAt?: Date;
  updatedAt?: Date;
};
