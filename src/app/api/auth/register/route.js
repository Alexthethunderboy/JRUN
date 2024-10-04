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

    if (userType === 'worker' && services && services.length > 0) {
      userData.services = {
        create: services.map(serviceType => ({
          serviceType,
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      };
    }

    const user = await prisma.user.create({
      data: userData,
      include: {
        services: true,
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        services: user.services,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred while registering the user' }, { status: 500 });
  }
}