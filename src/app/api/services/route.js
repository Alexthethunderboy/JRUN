// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import dbConnect from '@/lib/mongodb';
// import Service from '@/models/Service';
// import User from '@/models/User';

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await dbConnect();

//     const { type, workerId, scheduledDate, price, description } = await req.json();

//     if (!type || !workerId || !scheduledDate || !price) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }

//     const worker = await User.findById(workerId);
//     if (!worker || worker.userType !== 'worker') {
//       return NextResponse.json({ error: 'Invalid worker' }, { status: 400 });
//     }

//     const service = await Service.create({
//       type,
//       user: session.user.id,
//       worker: workerId,
//       scheduledDate,
//       price,
//       description,
//     });

//     return NextResponse.json({ message: 'Service created successfully', service }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'An error occurred while creating the service' }, { status: 500 });
//   }
// }

// export async function GET(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const status = searchParams.get('status');

//     let query = {};
//     if (session.user.userType === 'user') {
//       query.user = session.user.id;
//     } else {
//       query.worker = session.user.id;
//     }

//     if (status) {
//       query.status = status;
//     }

//     const services = await Service.find(query).populate('user', 'name').populate('worker', 'name');

//     return NextResponse.json({ services }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: 'An error occurred while fetching services' }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';
import User from '@/models/User';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { type, workerId, scheduledDate, price, description } = await req.json();

    if (!type || !workerId || !scheduledDate || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const worker = await User.findById(workerId);
    if (!worker || worker.userType !== 'worker') {
      return NextResponse.json({ error: 'Invalid worker' }, { status: 400 });
    }

    const service = await Service.create({
      type,
      user: session.user.id,
      worker: workerId,
      scheduledDate,
      price,
      description,
    });

    return NextResponse.json({ message: 'Service created successfully', service }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while creating the service' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = {};
    if (session.user.userType === 'user') {
      query.user = session.user.id;
    } else {
      query.worker = session.user.id;
    }

    if (status) {
      query.status = status;
    }

    const services = await Service.find(query)
      .populate('user', 'name')
      .populate('worker', 'name');

    return NextResponse.json({ services }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching services' }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const serviceId = searchParams.get('id');

    if (!serviceId) {
      return NextResponse.json({ error: 'Missing service ID' }, { status: 400 });
    }

    const service = await Service.findById(serviceId);

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    if (session.user.id !== service.user.toString() && session.user.id !== service.worker.toString()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await service.deleteOne();

    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while deleting the service' }, { status: 500 });
  }
}
