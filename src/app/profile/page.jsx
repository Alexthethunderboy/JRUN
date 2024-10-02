import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import ProfileComponent from '@/components/ProfileComponent';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div className="container mx-auto px-4 py-8 text-center text-white">Not authenticated</div>;
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
    return <div className="container mx-auto px-4 py-8 text-center text-white">User not found</div>;
  }

  return <ProfileComponent initialData={user} />;
}