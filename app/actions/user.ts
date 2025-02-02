'use server';

import prisma from '@/lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function createUser(
  previousState: any | null,
  formData: FormData
): Promise<any> {
  try {
    const email = formData.get('email');
    const name = formData.get('name');
    const age = formData.get('age');

    if (!email || !name || !age) {
      return { error: 'Name, email, and age are required' };
    }

    if (
      typeof email !== 'string' ||
      typeof name !== 'string' ||
      typeof age !== 'number'
    ) {
      return { error: 'Invalid input format' };
    }

    console.log('Attempting to create user:', { email, name, age });

    // Create new user in database using the singleton client
    const user = await prisma.userSubscriber.create({
      data: {
        email,
        name,
        age,
      },
    });

    console.log('Successfully created user:', user);
    return { success: true };
  } catch (error: any) {
    console.error('Failed to create user:', {
      name: error.name,
      message: error.message,
      code: error.code,
    });

    // Handle unique constraint violation
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return { error: 'This user already exists' };
    }

    // Handle connection errors
    if (
      error instanceof PrismaClientKnownRequestError &&
      (error.code === 'P1001' || error.code === 'P1002')
    ) {
      return {
        error: 'Unable to connect to the database. Please try again later.',
      };
    }

    return { error: 'Failed to create user. Please try again later.' };
  }
}
