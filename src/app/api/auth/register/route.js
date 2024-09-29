import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();

    const { name, email, password, userType, services } = await req.json();

    if (!name || !email || !password || !userType) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

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
      userData.services = services;
    }

    const user = await User.create(userData);

    return NextResponse.json({ 
      message: 'User created successfully', 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        userType: user.userType 
      } 
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred while registering the user' }, { status: 500 });
  }
}