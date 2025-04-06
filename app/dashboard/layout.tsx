'use client';

import { AppSidebar } from '@/components/common/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { dashboardRoutes } from '@/lib/routes';
import { Bell, Search } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Work_Sans } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const workSans = Work_Sans({
  subsets: ['latin'],
});
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const user = session.data?.user;
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
                <Button className="w-5 h-5 bg-secondary_bg hover:bg-slate-100 transition-all relative p-5 rounded-full">
                  <Bell className="text-gray-500 hover:text-primary" />
                </Button>

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
