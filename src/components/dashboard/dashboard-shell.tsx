"use client"

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { ReactNode } from "react";
import { UserRole } from "@/types";
import { useGetMe } from "@/hooks";
import UserDropdown from "../layout-public/userDropdown";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {

  const { data: user, isLoading } = useGetMe();

  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-10 justify-between ">
          
            <SidebarTrigger className="-ml-1 p-5"  /> 

            <div className="">
              {user?.data && (
              <UserDropdown user={user.data} />
            )}
            </div>
        </header>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
