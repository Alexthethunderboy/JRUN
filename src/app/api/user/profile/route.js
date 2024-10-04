import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { writeFile } from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        bio: true,
        location: true,
        phone: true,
        createdAt: true,
        userType: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const formData = await req.formData();
    const name = formData.get('name');
    const bio = formData.get('bio');
    const location = formData.get('location');
    const phone = formData.get('phone');
    const image = formData.get('image');

    let imageUrl = null;
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filename = `${session.user.id}-${Date.now()}${path.extname(image.name)}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const filepath = path.join(uploadDir, filename);

      try {
        await writeFile(filepath, buffer);
        imageUrl = `/uploads/${filename}`;
      } catch (error) {
        console.error("Error saving image:", error);
        return NextResponse.json({ error: "Failed to save image", details: error.message }, { status: 500 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name,
        bio,
        location,
        phone,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}