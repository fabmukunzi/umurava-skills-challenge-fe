'use client';

import { AppSidebar } from '@/components/common/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import Dropdown from '@/components/ui/dropdown';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { dashboardRoutes } from '@/lib/routes';
import { INotification } from '@/lib/types/notification';
import { useGetNotificationsQuery } from '@/store/actions/notification';
import { Bell, LucideLoader, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Work_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const workSans = Work_Sans({
  subsets: ['latin'],
});
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const user = session?.data?.user;
  const { data, isLoading, isError } = useGetNotificationsQuery({});
  const notificationsData = Array.isArray(data) ? data : (data?.data || []);

  const notificationsCount = notificationsData
    .filter((notif: INotification) => {
      if (user?.role === 'admin') return notif.status === 'unread';
      return notif.status === 'unread' && notif.userId === user?.name;
    })
    .length;
  const hasNotifications = notificationsCount > 0;

  const router = useRouter();

  const NotificationContainer = () => (<div className="absolute right-0 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
    <div className="py-2 px-3 border-b border-gray-100">
      <h3 className="text-sm font-medium">Notifications {notificationsCount > 0 && `(${notificationsCount})`} </h3>
    </div>
    <div className="max-h-64 overflow-y-auto py-1">
      {isLoading && (
        <div className="flex items-center justify-center h-32">
          <LucideLoader className="animate-spin h-5 w-5 text-gray-500" />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500 tex-sm">Error loading notifications</div>
        </div>
      )}
      {notificationsData.length === 0 && (
        <div className="flex items-center justify-center">
          <div className="text-gray-500 tex-sm">No notifications</div>
        </div>
      )}
      {notificationsData.map((notif: INotification) => (
        <div key={notif._id} className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm">{notif.message}</p>
          <span className="text-xs text-gray-500">{notif.timestamp}</span>
        </div>
      ))}
    </div>
    {notificationsData.length > 0 && (<div className="border-t border-gray-100 py-2 px-3">
      <button
        className="text-primary text-xs font-medium w-full text-center"
        onClick={() => router.push("/dashboard/notifications")}
      >
        View all notifications
      </button>
    </div>)}
  </div>)

  const NotificationIcon = () => (
    <div className="relative">
      <Bell className="h-5 w-5 text-gray-500 hover:text-primary" />
      {hasNotifications && (
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      )}
    </div>
  );

  const NotificationButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full bg-secondary_bg hover:bg-slate-200 transition-all"
      onClick={(e) => {
        e.preventDefault(); // Prevent navigation when clicking the button itself
      }
      }
    >
      <Dropdown
        icon={<NotificationIcon />}
        items={[<NotificationContainer key="notification-container" />]}
      />
    </Button>
  );

  return (
    <main
      className={`${workSans.className} text-primary antialiased overflow-hidden`}
    >
      <div className="flex h-screen">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-col flex-1">
            <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
              <SidebarTrigger className="lg:hidden" />
              <div className="flex relative items-center w-1/2 md:w-full max-w-md">
                <Search className="text-gray-400 absolute w-5 h-5 left-3" />
                <Input
                  type="text"
                  placeholder="Search here..."
                  className="pl-10 text-black bg-secondary_bg"
                />
              </div>

              <div className="flex items-center space-x-6">
                {['admin', 'super admin'].includes(user?.role?.toLowerCase() || '') && (
                  <div className="relative">
                    <NotificationButton />
                  </div>
                )}

                <Link
                  href={dashboardRoutes.profile.path}
                  className="flex items-center space-x-3"
                >
                  {user?.profileUrl ? (
                    <Image
                      src={user?.profileUrl || ''}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full border p-1"
                    />
                  ) : (
                    <Skeleton className="w-full" />
                  )}
                </Link>
              </div>
            </header>

            <main className="p-4 flex-1 overflow-y-auto bg-secondary_bg">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </main>
  );
};

export default DashboardLayout;
