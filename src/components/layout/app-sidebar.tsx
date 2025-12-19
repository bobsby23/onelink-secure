
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Link as LinkIcon, Users, Settings, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Logo from "@/components/icons/logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { loggedInUser } from "@/lib/data";
import { Separator } from "../ui/separator";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/links", label: "Links", icon: LinkIcon },
  { href: "/dashboard/friends", label: "Friends", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="w-7 h-7 shrink-0 text-primary" />
            <span className="text-lg font-bold font-headline">OneLink</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label }}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <Separator className="my-2"/>
         <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip={{ children: "My Profile" }}>
                    <Link href={`/u/${loggedInUser.nickname}`}>
                        <Avatar className="w-7 h-7">
                            <AvatarImage src={loggedInUser.avatarUrl} alt={loggedInUser.profile.name} />
                            <AvatarFallback>{loggedInUser.profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="truncate">{loggedInUser.profile.name}</span>
                    </Link>
                 </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip={{ children: "Log Out" }}>
                    <Link href="/">
                        <LogOut />
                        <span>Log Out</span>
                    </Link>
                 </SidebarMenuButton>
             </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
