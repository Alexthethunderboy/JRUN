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

export default function DashboardPage() {
  const { data: session } = useSession();
  const [upcomingServices, setUpcomingServices] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch upcoming services and recent activities
    const fetchData = async () => {
      const servicesRes = await fetch('/api/services/upcoming');
      const activitiesRes = await fetch('/api/activities/recent');
      const profileRes = await fetch('/api/user/profile');
      
      if (servicesRes.ok && activitiesRes.ok && profileRes.ok) {
        setUpcomingServices(await servicesRes.json());
        setRecentActivities(await activitiesRes.json());
        const profileData = await profileRes.json();
        setIsProfileComplete(profileData.isComplete);
      }
    };
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaRunning className="mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button className="w-full mb-2">
              <Link href={'/services/book'}>Book a Service </Link>
              </Button>
            <Button variant="outline" className="w-full text-black">
            <Link href={'/services/manage'}> Manage Services</Link>
              </Button>
              {/* <Link href="/profile/edit">
                <Button className="w-full mt-2">Update Profile</Button>
              </Link> */}
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaClipboardList className="mr-2" />
              Upcoming Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {upcomingServices.map((service, index) => (
                <li key={index}>{service.name} - {service.date}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaComments className="mr-2" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recentActivities.map((activity, index) => (
                <li key={index}>{activity.description}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FaBell className="mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>New message from support</li>
              <li>Upcoming appointment reminder</li>
              <li>Special offer available</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle>Your Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Services Booked: 15</p>
            <p>Total Spent: $500</p>
            <p>Average Rating: 4.8/5</p>
          </CardContent>
        </Card>

        <Card className='bg-black text-white border-0'>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li><Link href="/profile" className="text-primary hover:underline">View Profile</Link></li>
              <li><Link href="/services" className="text-primary hover:underline">Manage Services</Link></li>
              <li><Link href="/messages" className="text-primary hover:underline">Check Messages</Link></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}