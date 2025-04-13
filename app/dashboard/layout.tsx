'use client';

import { AppSidebar } from '@/components/common/dashboard/sidebar';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { dashboardRoutes } from '@/lib/routes';
import { INotification } from '@/lib/types/notification';
import { useGetNotificationsQuery } from '@/store/actions/notification';
import { Bell, LucideLoader2, LucideLogOut, LucideUser, Search } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Work_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { NotificationResponse } from './notifications/page';
import dayjs from 'dayjs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const workSans = Work_Sans({
  subsets: ['latin'],
});

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const user = session?.data?.user;
  const { data, isLoading } = useGetNotificationsQuery<NotificationResponse>({});
  const notificationsData = useMemo(() => {
    if (Array.isArray(data)) return data;
    return (data && 'data' in data) ? (data.data) : [];
  }, [data]);
  const notifications = useMemo(() => {
    if (Array.isArray(notificationsData)) {
      return notificationsData
        .filter(item => item.status === 'unread')
        .slice(0, 2);
    }
    return [];
  }, [notificationsData, user?.role, user?.id]);

  const notificationsCount = useMemo(() => notificationsData
    .filter((notif: INotification) => notif.status === 'unread')
    .length, [notificationsData, user?.role, user?.id]);
  const hasNotifications = notificationsCount > 0;
  const noNotifications = notificationsCount === 0;

  const router = useRouter();
  const pathname = usePathname();
  const currentPathLength = pathname.split('/').length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();

    if (!searchTerm || searchTerm.trim() === '') {
      router.push(pathname);
      return;
    }
    router.push(`${pathname}?search=${searchTerm}`);
  };

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/',
    });
  };

  const NotificationContainer = () => (<div className="relative">
    <DropdownMenu>
      <DropdownMenuTrigger className='rounded-full flex items-center justify-center border p-1 object-contain h-10 w-10'>
        <NotificationIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-52'>
        <DropdownMenuLabel>Unread {notificationsCount > 0 && `(${notificationsCount})`}</DropdownMenuLabel>
        <>
          {isLoading && (
            <div className="flex items-center justify-center h-32">
              <LucideLoader2 className="animate-spin" />
            </div>
          )}
          {noNotifications && (
            <DropdownMenuItem>No unread notifications</DropdownMenuItem>
          )}
          {notifications.map((notif: INotification) => (
            <DropdownMenuItem key={notif._id} className='flex flex-col items-start gap-2'>
              <p className="text-sm">{notif.title}</p>
              <span className="text-xs text-gray-500">{dayjs(notif.timestamp).format('YYYY-MM-DD HH:ss A')}</span>
            </DropdownMenuItem>
          ))}
        </>
        {hasNotifications && (<DropdownMenuLabel onClick={() => router.push("/dashboard/notifications")} className='hover:text-gray-500 cursor-pointer'>View all</DropdownMenuLabel>)}
      </DropdownMenuContent>
    </DropdownMenu>
  </div>)

  const ProfileContainer = () => (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2'>
        <Image
          src={user?.profileUrl || ''}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full border p-1 object-contain h-10 w-10"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-fit'>
        <DropdownMenuLabel className="flex items-center gap-2">
          <Image
            src={user?.profileUrl || ''}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full border p-1 object-contain h-10 w-10"
          />
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={dashboardRoutes.profile.path} className="flex items-center gap-2">
              <LucideUser className='size-4' /> View Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-500">
            <LucideLogOut className='size-4' /> Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const NotificationIcon = () => (
    <div className="relative p-1 ring-1 ring-gray-50 rounded-full bg-secondary_bg hover:bg-slate-200 transition-all">
      <Bell className="size-5 text-gray-500 hover:text-primary" />
      {hasNotifications && (
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      )}
    </div>
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
              {currentPathLength < 4 && (<div className="flex relative items-center w-1/2 md:w-full max-w-md">
                <Search className="text-gray-400 absolute w-5 h-5 left-3" />
                <Input
                  type="text"
                  placeholder="Search here... "
                  className="pl-10 text-black bg-secondary_bg"
                  onChange={handleSearch}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const searchTerm = (e.target as HTMLInputElement).value.toLowerCase();
                      if (!searchTerm || searchTerm.trim() === '') {
                        router.push(pathname);
                        return;
                      }
                      router.push(`${pathname}?search=${searchTerm}`);
                    }
                  }
                  }
                />
              </div>)}

              <div className="flex items-center space-x-2">
                <NotificationContainer />

                {user?.profileUrl ? (
                  <ProfileContainer />
                ) : (
                  <Skeleton className="w-full" />
                )}
              </div>
            </header>

            <main className="md:p-4 flex-1 overflow-y-auto bg-secondary_bg">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </div>
    </main>
  );
};

export default DashboardLayout;
