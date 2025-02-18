import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const { name, email, password, userType, services } = await req.json();

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
      userType,
    };

    const user = await prisma.user.create({
      data: userData,
    });

    // If the user is a worker, create associated services
    if (userType === 'worker' && services && services.length > 0) {
      const now = new Date();
      await prisma.service.createMany({
        data: services.map(serviceType => ({
          userId: user.id,
          serviceType,
          status: 'ACTIVE',
          date: now.toISOString().split('T')[0], // Current date in YYYY-MM-DD format
          time: now.toTimeString().split(' ')[0], // Current time in HH:MM:SS format
          location: 'Default Location', // Set to null or provide a default value
        })),
      });
    }

    // Fetch the created user with their services
    const createdUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        clientServices: true,
        workerServices: true,
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        userType: createdUser.userType,
        services: createdUser.userType === 'worker' ? createdUser.workerServices : createdUser.clientServices,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred while registering the user' }, { status: 500 });
  }
}