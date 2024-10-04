import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const availableJobs = await prisma.service.findMany({
      where: {
        status: 'PENDING',
      },
    });

    return NextResponse.json(availableJobs);
  } catch (error) {
    console.error("Error fetching available jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}