'use server';

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, age, custom } = await req.json();
    const newUser = await prisma.user.create({
      data: { name, email, age, custom },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
