import { NextResponse } from 'next/server';

let users: { id: number; name: string; email: string; age: number }[] = [];

export async function GET() {
  const storedUsers = localStorage.get('users') || '';
  return NextResponse.json(storedUsers.length > 0 ? storedUsers : users, {
    status: 200,
  });
}

export async function POST(req: Request) {
  const { name, email, age } = await req.json();
  const newUser = { id: users.length + 1, name, email, age };
  users.push(newUser);
  localStorage.set('users', JSON.stringify(users));
  return NextResponse.json(newUser, { status: 201 });
}
