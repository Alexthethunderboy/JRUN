import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma'; // Make sure Prisma is properly set up

export async function POST(req) {
  try {
    const { name, email, password, userType, services } = await req.json();

    // Check if all required fields are provided
    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the user already exists in the database using Prisma
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare user data
    const userData = {
      name,
      email,
      password: hashedPassword,
      userType,
    };

    // If the user is a worker and services are provided, include the services
    if (userType === 'worker' && services && services.length > 0) {
      userData.services = {
        create: services.map(service => ({ service })),
      };
    }

    // Create the new user in the database using Prisma
    const user = await prisma.user.create({
      data: userData,
    });

    // Return a success response with the new user's data (excluding the password)
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred while registering the user' }, { status: 500 });
  }
}
