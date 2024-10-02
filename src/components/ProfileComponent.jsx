'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GridLoader } from "react-spinners";

export default function ProfileComponent({ initialData }) {
  const [userProfile, setUserProfile] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/user/profile");
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      fetchProfile();
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <GridLoader color="#597D35" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-white">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-red-500">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-white">
        <h1 className="text-3xl font-bold mb-6">Profile Not Found</h1>
        <p>We couldn't find your profile information.</p>
        <Link href="/profile/edit">
          <Button className="mt-4">Create Profile</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black text-white border-0">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Image
              src={userProfile.image || "/placeholder.svg"}
              width={100}
              height={100}
              alt="Profile"
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold">{userProfile.name}</h2>
            <p className="text-gray-500">{userProfile.email}</p>
            <p className="mt-2">{userProfile.bio}</p>
            <p className="mt-2">
              Location: {userProfile.location || "Not specified"}
            </p>
            <p className="mt-2">
              Phone: {userProfile.phone || "Not specified"}
            </p>
            <Link href="/profile/edit">
              <Button className="mt-4">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-black text-white border-0" >
          <CardHeader>
            <CardTitle>Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                Member Since:{" "}
                {new Date(userProfile.createdAt).toLocaleDateString()}
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}