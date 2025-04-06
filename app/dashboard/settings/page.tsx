'use client';

import { useState } from 'react';
import { useChangePasswordMutation } from '@/store/actions/users';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { handleError } from '@/lib/errorHandler';

const SettingsPage = () => {
  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState<string>('');

  const handleChangePassword = async () => {
    setPasswordError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('The new passwords do not match.');
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      toast({ title: 'Password changed successfully' });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <Card className="w-full max-w-3xl shadow-lg rounded-xl overflow-hidden bg-white">
        <CardHeader className="text-center bg-blue-600 text-white py-6">
          <CardTitle className="text-2xl font-semibold">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-700">
              Change Password
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter your current password"
                  className="border-gray-300 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter a new password"
                  className="border-gray-300 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  className="border-gray-300 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>

            <Button
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              disabled={isChangingPassword}
              onClick={handleChangePassword}
            >
              {isChangingPassword ? (
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
              ) : (
                'Change Password'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
