import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sort = searchParams.get('sort'); 

  let orderBy = {};

  switch (sort) {
    case 'oldest': orderBy = { createdAt: 'asc' }; break;
    case 'elixir_asc': orderBy = { averageElixir: 'asc' }; break;
    case 'elixir_desc': orderBy = { averageElixir: 'desc' }; break;
    default: orderBy = { createdAt: 'desc' }; 
  }

  const decks = await prisma.deck.findMany({
    include: { user: true },
    orderBy: orderBy,
  });
  
  return NextResponse.json(decks);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, cardData, averageElixir, username } = body; 

    if (!username || !name) {
        return NextResponse.json({ error: 'Data tidak lengkap' }, { status: 400 });
    }

    const user = await prisma.user.upsert({
        where: { username: username },
        update: {}, 
        create: { username: username }, 
    });

    const newDeck = await prisma.deck.create({
      data: {
        name,
        cards: JSON.stringify(cardData),
        averageElixir: parseFloat(averageElixir), 
        userId: user.id, 
      },
    });

    return NextResponse.json(newDeck);

  } catch (error: any) {
    console.error(error); 
    return NextResponse.json({ error: 'Gagal menyimpan deck.' }, { status: 500 });
  }
}