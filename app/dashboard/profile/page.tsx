'use client';

import { useEffect, useState } from 'react';
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/store/actions/users';
import { Loader2, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/errorHandler';

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const { toast } = useToast();
  const [names, setNames] = useState(user?.data?.names || '');
  const [profileUrl, setProfileUrl] = useState(user?.data?.profile_url);
  useEffect(() => {
    if (user?.data) {
      setNames(user.data.names);
      setProfileUrl(user.data.profile_url);
    }
  }, [user]);
  const handleUpdate = async () => {
    try {
      await updateProfile({
        names,
        email: user?.data?.email,
        profile_url: profileUrl,
      }).unwrap();
      toast({ title: 'Profile updated successfully' });
    } catch (error) {
      handleError(error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center">
            {isLoading ? (
              <Skeleton className="w-24 h-24 rounded-full" />
            ) : (
              <div className="relative w-24 h-24">
                {profileUrl && (
                  <Image
                    src={profileUrl}
                    alt="Profile"
                    width={100}
                    height={100}
                    priority
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                )}
                <label
                  htmlFor="file-upload"
                  className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full cursor-pointer"
                >
                  <Camera className="w-5 h-5" />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>
          <div>
            <Label>Names</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input value={names} onChange={(e) => setNames(e.target.value)} />
            )}
          </div>

          <div>
            <Label>Email</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input value={user?.data?.email} disabled />
            )}
          </div>

          <Button
            className="w-full"
            disabled={isUpdating}
            onClick={handleUpdate}
          >
            {isUpdating ? (
              <Loader2 className="animate-spin w-5 h-5 mr-2" />
            ) : (
              'Update Profile'
            )}
          </Button>

          {isError && (
            <p className="text-red-500 text-center">Failed to load profile.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
