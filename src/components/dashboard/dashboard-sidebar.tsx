"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assests/logo/logo.png";

import type { SidebarRoutes, UserRole } from "@/types";
import { adminRoutes, citizenRoutes, technicianRoutes } from "@/routes";
import { usePathname } from "next/navigation";

const sidebarRoutes: Partial<Record<UserRole, SidebarRoutes>> = {
  SUPER_ADMIN: adminRoutes,
  ADMIN: adminRoutes,
  TECHNICIAN: technicianRoutes,
  CITIZEN: citizenRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const routes: SidebarRoutes = sidebarRoutes[role] || [];
  const pathnme = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          aria-label="CityCare home"
          className="flex shrink-0 items-center gap-2.5 ps-2 lg:ps-4"
        >
          <Image
            src={Logo}
            alt="CityCare"
            width={50}
            height={50}
            className="h-7 w-auto object-contain lg:h-15"
            priority
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton isActive={pathnme === item.url} asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
