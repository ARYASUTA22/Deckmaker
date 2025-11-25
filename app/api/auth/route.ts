import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function POST(request: Request) {
  const { username } = await request.json();

  if (!username) return NextResponse.json({ error: 'Username wajib diisi' }, { status: 400 });

  const user = await prisma.user.upsert({
    where: { username },
    update: {},
    create: { username },
  });

  return NextResponse.json(user);
}