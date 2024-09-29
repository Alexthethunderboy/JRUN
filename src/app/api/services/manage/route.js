import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import User from '@/models/User';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Only allow workers to access this route
    const worker = await User.findById(session.user.id);
    if (!worker || worker.userType !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Fetch services where the current worker is assigned and the status is pending
    const services = await Service.find({ worker: worker._id })
      .populate('user', 'name')
      .populate('worker', 'name');

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching services' }, { status: 500 });
  }
}
