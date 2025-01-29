/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Calendar,
  Home,
  Inbox,
  Settings,
  HelpCircle,
  UserPlus,
  LogOut,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import { CollapsedUmuravaLogo } from '@/lib/images';
import { dashboardRoutes } from '@/lib/routes';
import { useState } from 'react';
import Link from 'next/link';

const items = [
  {
    title: dashboardRoutes.dashboard.label,
    url: dashboardRoutes.dashboard.path,
    icon: Home,
  },
  {
    title: dashboardRoutes.challengeHackathons.label,
    url: dashboardRoutes.challengeHackathons.path,
    icon: Inbox,
  },
  {
    title: dashboardRoutes.community.label,
    url: dashboardRoutes.community.path,
    icon: Calendar,
  },
];

const footerItems = [
  { title: 'Settings', icon: Settings, url: '/settings' },
  { title: 'Help Center', icon: HelpCircle, url: '/help' },
  { title: 'Refer Family & Friends', icon: UserPlus, url: '/refer' },
];

export function AppSidebar() {
  const [selectedItem, setSelectedItem] = useState(items[0].title);
  const [selectedFooterItem, setSelectedFooterItem] = useState<string | null>(
    null
  );

  const handleSelection = (title: string) => {
    setSelectedItem(title);
  };

  const handleFooterSelection = (title: string) => {
    setSelectedFooterItem(title);
  };

  return (
    <Sidebar>
      <SidebarContent className="bg-primary h-full flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="my-5">
            <Image src={CollapsedUmuravaLogo} alt="Umurava logo" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`rounded-lg group py-1 px-2 ${
                    selectedItem === item.title
                      ? 'bg-white text-primary'
                      : 'hover:bg-white hover:text-primary text-white'
                  }`}
                  onClick={() => handleSelection(item.title)}
                >
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center space-x-2"
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {footerItems.map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className={`rounded-lg group py-1 px-2 ${
                      selectedFooterItem === item.title
                        ? 'bg-white text-primary'
                        : 'hover:bg-white hover:text-primary text-white'
                    }`}
                    onClick={() => handleFooterSelection(item.title)}
                  >
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className="flex items-center space-x-2"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="py-6 mt-4 px-2 flex items-center gap-4">
            <div className="flex items-center space-x-3">
              <Image
                src="https://res.cloudinary.com/dagurahkl/image/upload/v1677431165/syxnnttrcpijmnuuon46.jpg"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover border-2 border-white"
              />
              <div>
                <p className="text-white font-medium">Hilaire Sh</p>
                <p className="text-white text-sm">hilaire@uidesign</p>
              </div>
            </div>
            <div>
              <LogOut className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
