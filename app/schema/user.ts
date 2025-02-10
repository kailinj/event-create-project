import { JsonValue } from '@prisma/client/runtime/library';
import { z } from 'zod';

export const userForm = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required' })
    .email('Invalid email address'),
  age: z
    .string()
    .min(1, {
      message: 'Age is required',
    })
    .refine((age) => Number(age) >= 1, {
      message: 'Age must be a positive number',
    })
    .transform((age) => Number(age)),
  custom: z
    .record(
      z.string().min(1, { message: 'Label is required' }),
      z.string().min(1, { message: 'Value is required' })
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
