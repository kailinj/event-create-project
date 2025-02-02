import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice Jones',
    email: 'ajones@mailinator.com',
    age: 42,
  },
  {
    name: 'Bob Williams',
    email: 'bwilliams@mailinator.com',
    age: 61,
  },
];

export async function main() {
  for (const u of userData) {
    await prisma.user.create({ data: u });
  }
}

main();
