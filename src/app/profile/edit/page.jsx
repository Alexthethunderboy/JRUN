'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GridLoader } from 'react-spinners';
import { toast } from 'react-hot-toast';

export default function EditProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await res.json();
        setProfile(data);
        setImagePreview(data.image);
      } catch (err) {
        setError(err.message);
        toast.error(`Error fetching profile: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchProfile();
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (key !== 'image') {
          formData.append(key, profile[key]);
        }
      });
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }

      toast.success('Profile updated successfully');
      router.push('/profile');
    } catch (err) {
      setError(err.message);
      toast.error(`Error updating profile: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'><GridLoader color='#597D35'/></div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p className="text-red-500">{error}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Profile Not Found</h1>
        <p>We couldn't find your profile information.</p>
        <Button className="mt-4" onClick={() => setProfile({})}>Create New Profile</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Update Your Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center">
              <Image
                src={imagePreview || profile.image || "/placeholder.svg"}
                width={100}
                height={100}
                alt="Profile"
                className="rounded-full mx-auto mb-4"
              />
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Label htmlFor="image" className="cursor-pointer text-primary hover:underline">
                Change Profile Picture
              </Label>
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={profile.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email || ''}
                onChange={handleInputChange}
                required
                disabled
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio || ''}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={profile.location || ''}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={profile.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? <GridLoader color='#ffffff' size={10} /> : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}