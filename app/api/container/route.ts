import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/commons/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { containerNumber, status, currentLocation } = body;
    console.log('Creating container:', body); 
    // Create a new container in the database
    const newContainer = await prisma.container.create({
      data: {
        containerNumber,
        status,
        currentLocation,
      },
    });

    return NextResponse.json(newContainer, { status: 201 });
  } catch (error) {
    console.error('Failed to create container:', error);
    return NextResponse.json({ error: 'Failed to create container' }, { status: 500 });
  }
}
