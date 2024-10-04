import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { serviceId } = params;

    const updatedService = await prisma.service.update({
      where: { id: serviceId },
      data: {
        status: 'ACCEPTED',
        workerId: session.user.id,
      },
    });

    // Create a notification for the client
    await prisma.notification.create({
      data: {
        userId: updatedService.userId,
        serviceId: updatedService.id,
        message: `Your ${updatedService.serviceType} service has been accepted by a worker.`,
      },
    });

    return NextResponse.json(updatedService);
  } catch (error) {
    console.error("Error accepting job:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}