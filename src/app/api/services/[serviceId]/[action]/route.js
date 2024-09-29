import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import User from '@/models/User';

export async function PATCH(req, { params }) {
  const { serviceId, action } = params;

  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Ensure only workers can perform actions on services
    const worker = await User.findById(session.user.id);
    if (!worker || worker.userType !== 'worker') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Find the service by ID
    const service = await Service.findById(serviceId);

    if (!service || service.worker.toString() !== worker._id.toString()) {
      return NextResponse.json({ error: 'Service not found or unauthorized' }, { status: 404 });
    }

    // Validate the action and update service status
    if (action === 'accepted') {
      service.status = 'accepted';
    } else if (action === 'declined') {
      service.status = 'declined';
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    await service.save();

    return NextResponse.json({ message: `Service ${action}`, service }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while updating the service' }, { status: 500 });
  }
}
