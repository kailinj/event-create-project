import { JsonValue } from '@prisma/client/runtime/library';
import { z } from 'zod';

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
    })
    .transform((age) => Number(age)),
  custom: z
    .record(
      z.string().min(1, { message: 'Please enter a label.' }),
      z.string().min(1, { message: 'Please enter a value.' })
    )
    .optional(),
});

export type User = {
  id?: number;
  name: string;
  email: string;
  age: string;
  custom?: JsonValue | undefined;
  createdAt?: Date;
  updatedAt?: Date;
};

export type ActiveUser = User | undefined;
