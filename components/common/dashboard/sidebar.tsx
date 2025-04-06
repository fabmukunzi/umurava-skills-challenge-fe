/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Bell, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { CollapsedUmuravaLogo, MessageIcon } from "@/lib/images";
import { dashboardRoutes, homepageRoutes } from "@/lib/routes";
import { useEffect, useState } from "react";
import Link from "next/link";
import SVGIcon from "@/components/common/svg";
import HomeIcon from "@/components/common/svg/home-icon";
import PaperIcon from "@/components/common/svg/paper-icon";
import PersonPlusIcon from "@/components/common/svg/person-plus-icon";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import GearIcon from "@/components/common/svg/gear-icon";
import HeadsetIcon from "@/components/common/svg/headset-icon";
import GiftBoxIcon from "@/components/common/svg/giftbox-icon";
import { signOut, useSession } from "next-auth/react";
import SidebarSkeleton from "../sidebar-skeleton";

const items = [
  {
    title: dashboardRoutes.dashboard.label,
    url: dashboardRoutes.dashboard.path,
    icon: HomeIcon,
  },
  {
    title: dashboardRoutes.challengeHackathons.label,
    url: dashboardRoutes.challengeHackathons.path,
    icon: PaperIcon,
  },
  {
    title: dashboardRoutes.community.label,
    url: dashboardRoutes.community.path,
    icon: PersonPlusIcon,
    isDialog: true,
  },
];

const footerItems = [
  { title: "Settings", icon: GearIcon, url: "/settings" },
  { title: "Help Center", icon: HeadsetIcon, url: "/help" },
  { title: "Refer Family & Friends", icon: GiftBoxIcon, url: "/refer" },
  { title: "Notifications", icon: Bell, url: "/dashboard/notifications" },
];

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      profileUrl: string;
    };
  }
}

export function AppSidebar() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState(() => {
    const matchingItem = items.find(
      (item) =>
        pathname.startsWith(item.url) &&
        item.url !== dashboardRoutes.dashboard.path
    );
    return matchingItem?.title || items[0].title;
  });

  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    const matchingItem = items.find(
      (item) =>
        pathname.startsWith(item.url) &&
        item.url !== dashboardRoutes.dashboard.path
    );
    setSelectedItem(matchingItem?.title || items[0].title);
  }, [pathname]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | undefined>(undefined);
  if (!session?.data) {
    return <SidebarSkeleton />;
  }

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <Sidebar>
        <SidebarContent className="bg-primary h-full flex flex-col justify-between">
          <SidebarGroup>
            <SidebarGroupLabel className="my-5">
              <Link href={homepageRoutes.home.path}>
                <Image src={CollapsedUmuravaLogo} alt="Umurava logo" />
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item, index) => {
                  const isSelected = selectedItem === item.title;
                  const isHovered = hoveredItem === item.title;
                  return (
                    <SidebarMenuItem
                      key={index}
                      className={`rounded group py-0 ${selectedItem === item.title
                        ? "bg-white text-primary"
                        : "hover:bg-white hover:text-primary text-white"
                        }`}
                      onClick={() => {
                        if (item.isDialog) {
                          setIsDialogOpen(true);
                        } else {
                          setSelectedItem(item.title);
                        }
                      }}
                      onMouseEnter={() => setHoveredItem(item.title)}
                      onMouseLeave={() => setHoveredItem(undefined)}
                    >
                      {item.isDialog ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="flex items-center space-x-2 h-11 px-2 w-full">
                              <SVGIcon
                                color={
                                  isHovered || isSelected ? "#2B71F0" : "white"
                                }
                                className="!h-5 !w-5 transition-colors duration-200"
                                Icon={item.icon}
                              />
                              <span className="text-sm font-medium">
                                {item.title}
                              </span>
                            </button>
                          </DialogTrigger>
                        </Dialog>
                      ) : (
                        <Link
                          href={item.url}
                          className="flex items-center space-x-2 h-11 px-3"
                        >
                          <SVGIcon
                            color={
                              isHovered || isSelected ? "#2B71F0" : "white"
                            }
                            className="!h-5 !w-5 transition-colors duration-200"
                            Icon={item.icon}
                          />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </Link>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {footerItems.map((item, index) => {
                    const isSelected = selectedItem === item.title;
                    const isHovered = hoveredItem === item.title;
                    return (
                      <SidebarMenuItem
                        key={index}
                        className={`rounded group py-0 ${isHovered || isSelected
                          ? "bg-white text-primary"
                          : " text-white"
                          }`}
                        onClick={() => setSelectedItem(item.title)}
                        onMouseEnter={() => setHoveredItem(item.title)}
                        onMouseLeave={() => setHoveredItem(undefined)}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center space-x-2 h-11 px-3"
                        >
                          <SVGIcon
                            color={
                              isHovered || isSelected ? "#2B71F0" : "white"
                            }
                            className="!h-5 !w-5 transition-colors duration-200"
                            Icon={item.icon}
                          />
                          <span className="text-sm font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="py-6 mt-4 px-2 flex items-center gap-4">
              <div className="flex items-center space-x-1">
                <Image
                  src={user?.profileUrl || ""}
                  alt="Profile"
                  width={30}
                  height={30}
                  className="rounded-full object-cover border-2 border-white"
                />
                <div>
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-white text-xs truncate">{user?.email}</p>
                </div>
              </div>
              <div className="cursor-pointer">
                <LogOut onClick={handleLogout} className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          hideCloseButton={true}
          className="flex flex-col p-14 items-center text-center justify-center mx-auto"
        >
          <div className="bg-primary/20 rounded-full p-5 w-fit">
            <Image src={MessageIcon} alt="Join Community" />
          </div>
          <h1 className="text-black text-2xl font-semibold mt-10">
            Join our WhatsApp community
          </h1>
          <p className="text-primary_grey text-lg mb-5">
            Get notified on the latest projects and hackathons
          </p>
          <Button className="px-10">Join</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
