'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  const values = await req.json();

  await prisma.user.update({
    where: {
      id: values.id,
    },
    data: values,
  });
  return NextResponse.json(values, { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json({ message: 'Deleted Item' }, { status: 200 });
}
