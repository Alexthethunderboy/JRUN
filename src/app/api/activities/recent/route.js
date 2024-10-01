// import { NextResponse } from 'next/server';
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../../auth/[...nextauth]/route";
// import prisma from "@/lib/prisma";

// export async function GET(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     // Fetch recent activities (you may need to adjust this based on your data model)
//     const recentActivities = await prisma.activity.findMany({
//       where: { userId: session.user.id },
//       orderBy: { createdAt: 'desc' },
//       take: 5,
//     });

//     return NextResponse.json(recentActivities);
//   } catch (error) {
//     console.error("Error fetching recent activities:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }