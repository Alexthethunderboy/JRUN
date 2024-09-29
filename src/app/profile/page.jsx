'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarLoader, GridLoader } from 'react-spinners';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        setUserProfile(await res.json());
      }
    };

    fetchProfile();
  }, []);

  if (!userProfile) {
    return <div className='flex justify-center items-center min-h-screen'><GridLoader color='#597D35'/></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Image
              src={userProfile.image || "/placeholder.svg?height=100&width=100"}
              width={100}
              height={100}
              alt="Profile"
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
            <p className="text-gray-500">{userProfile.email}</p>
            <p className="mt-2">{userProfile.bio}</p>
            <Link href="/profile/edit">
              <Button className="mt-4">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Services Booked: {userProfile.servicesBooked}</li>
              <li>Services Completed: {userProfile.servicesCompleted}</li>
              <li>Average Rating: {userProfile.averageRating}/5</li>
              <li>Member Since: {new Date(userProfile.createdAt).toLocaleDateString()}</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {userProfile.recentActivity.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}