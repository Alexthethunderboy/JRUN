'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRunning, FaClipboardList, FaComments, FaBell } from 'react-icons/fa';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GridLoader } from 'react-spinners';
import ClientDashboard from '@/components/ClientDashboard';
import WorkerDashboard from '@/components/WorkerDashboard';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'><GridLoader color='#597D35'/></div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-6">Error</h1>
      <p className="text-red-500">{error}</p>
      <Button className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
    </div>;
  }

  const isProfileIncomplete = !userProfile || !userProfile.bio || !userProfile.location || !userProfile.phone;

  return (
    <div className="container mx-auto px-4 py-8 text-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center">
          <Image
            src={userProfile?.image || "/placeholder.svg"}
            width={50}
            height={50}
            alt="Profile"
            className="rounded-full mr-4"
          />
          <span className="font-semibold">{userProfile?.name || 'User'}</span>
        </div>
      </div>
      
      {isProfileIncomplete && (
        <Alert className="mb-6">
          <AlertTitle>Incomplete Profile</AlertTitle>
          <AlertDescription>
            Your profile is incomplete. Please <Link href="/profile/edit" className="underline">complete your profile</Link> to get the most out of our platform.
          </AlertDescription>
        </Alert>
      )}

      {userProfile?.userType === 'user' ? (
        <ClientDashboard userProfile={userProfile} />
      ) : (
        <WorkerDashboard userProfile={userProfile} />
      )}
    </div>
  );
}