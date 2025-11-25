
import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.CLASH_TOKEN;

  const res = await fetch('https://api.clashroyale.com/v1/cards', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Gagal konek ke Clash Royale API' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}