import { AppSidebar } from '@/components/common/dashboard/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Search } from 'lucide-react';
import Image from 'next/image';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
          <SidebarTrigger className='lg:hidden' />
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

              <div className="flex items-center space-x-3">
                <Image
                  src="https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            </div>
          </header>

          <main className="p-4 flex-1 h-fit overflow-y-auto bg-secondary_bg">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
