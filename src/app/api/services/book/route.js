import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { serviceType, date, time, location, description } = await req.json();

    const newService = await prisma.service.create({
      data: {
        serviceType,
        date,
        time,
        location,
        description,
        userId: session.user.id,
        status: 'PENDING',
      },
    });

    // Notify all workers about the new service
    const workers = await prisma.user.findMany({
      where: { userType: 'worker' },
    });

    for (const worker of workers) {
      await prisma.notification.create({
        data: {
          userId: worker.id,
          serviceId: newService.id,
          message: `A new ${serviceType} service is available.`,
        },
      });
    }

    return NextResponse.json(newService);
  } catch (error) {
    console.error("Error booking service:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}