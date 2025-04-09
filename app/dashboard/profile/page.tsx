'use client';

import { useEffect, useState } from 'react';
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
} from '@/store/actions/users';
import { Loader2, Camera, LucideArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/errorHandler';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface ChangePwdDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

const ProfilePage = () => {
  const { data: user, isLoading, isError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [updateProfilePicture, { isLoading: isUpdatingProfilePicture }] =
    useUpdateProfilePictureMutation();
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  const { toast } = useToast();
  const [names, setNames] = useState(user?.data?.names || '');
  const [profileUrl, setProfileUrl] = useState(user?.data?.profile_url);
  useEffect(() => {
    if (user?.data) {
      setNames(user.data.names);
      setProfileUrl(user.data.profile_url);
    }
  }, [user]);

  const { register, handleSubmit, formState: { errors } } = useForm<ChangePwdDto>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: async (data) => {
      console.log('resolver', data);
      const errors: Partial<Record<keyof ChangePwdDto, string>> = {};
      if (!data.currentPassword) {
        errors.currentPassword = 'Current password is required';
      }
      if (!data.newPassword) {
        errors.newPassword = 'New password is required';
      }
      if (data.newPassword !== data.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return { values: data, errors };
    }
  });

  const handleChangePassword = async (data: ChangePwdDto) => {
    try {
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      toast({ title: 'Password changed successfully' });
    } catch (error) {
      handleError(error);
    }
  };
  const handleUpdate = async () => {
    try {
      await updateProfile({
        names,
        email: user?.data?.email,
      }).unwrap();
      toast({ title: 'Profile updated successfully' });
    } catch (error) {
      handleError(error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileUrl(reader.result as string);
      reader.readAsDataURL(file);

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast({
          title: 'File size exceeds 5MB',
          description: 'Please select a smaller file.',
          variant: 'destructive',
        });
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a JPEG, PNG, or GIF file.',
          variant: 'destructive',
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      try {

        await updateProfilePicture(formData).unwrap();
        toast({ title: 'Profile picture updated successfully' });
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 space-y-4 md:space-y-8 max-w-screen-xl">
      <header>
        <Link href="/dashboard" className='flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 md:mb-6'>
          <LucideArrowLeft className="size-5" /> Back
        </Link>
        <h1 className='text-2xl text-gray-700 font-bold'>Profile</h1>
        <p className='text-gray-500'>Manage your personal information and account preferences</p>
      </header>

      <main className='grid grid-cols-3 gap-4 md:gap-8  w-full mx-auto'>
        <Card className="w-full h-full max-w-md shadow-lg md:pb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold">My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              {isLoading || isUpdatingProfilePicture ? (
                <Skeleton className="w-24 h-24 rounded-full border" />
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
            <div className='space-y-2'>
              <Label>Names</Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input value={names} onChange={(e) => setNames(e.target.value)} />
              )}
            </div>

            <div className='space-y-2'>
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

        <Card className="col-span-2 w-full h-full shadow-lg">
          <CardHeader className="text-left">
            <CardTitle className="text-2xl font-semibold">Change Password</CardTitle>
          </CardHeader>
          <CardContent>

            <form onSubmit={handleSubmit(handleChangePassword)} className="space-y-6">
              <div className='space-y-2'>
                <Label>Current Password</Label>
                <Input type="password" placeholder="Enter current password" {...register('currentPassword')} />
                {errors.currentPassword && (
                  <p className="text-red-500">{errors.currentPassword.toString()}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" {...register('newPassword')} />
                {errors.newPassword && (
                  <p className="text-red-500">{errors.newPassword.toString()}</p>
                )}
              </div>
              <div className='space-y-2'>
                <Label>Confirm Password</Label>
                <Input type="password" placeholder="Confirm new password" {...register('confirmPassword')} />
                {errors.confirmPassword && (
                  <p className="text-red-500">{errors.confirmPassword.toString()}</p>
                )}
              </div>

              <div className='flex gap-4'>
                <Button
                  className="flex-1"
                  disabled={isChangingPassword}
                  variant={'outline'}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </div>

              {isError && (
                <p className="text-red-500 text-center">Failed to load profile.</p>
              )}
            </form>

          </CardContent>
        </Card>
      </main>

    </div>
  );
};

export default ProfilePage;
