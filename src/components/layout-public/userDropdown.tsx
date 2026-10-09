"use client";

import {
  User,
  Settings,
  LogOut,
  ShieldCheck,
  LayoutDashboard,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser, UserRole } from "@/types";
import { useLogout } from "@/hooks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export default function UserDropdown({ user }: { user: IUser }) {
  const { mutate: logout, isPending } = useLogout();
  const queryClient = useQueryClient();
  const role: UserRole = !!user && user.role;

  const dashboardRoute: Record<UserRole, string> = {
    SUPER_ADMIN: "/super-admin",
    ADMIN: "/admin",
    TECHNICIAN: "/technician",
    CITIZEN: "/citizen",
  };

  const accountMenuItems = [
    {
      title: "Dashboard",
      href: dashboardRoute[role],
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      href: `${dashboardRoute[role]}/profile`,
      icon: User,
    },
  ];

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.success("Logout successful");
        queryClient.setQueryData(["user"], null);
        queryClient.removeQueries({ queryKey: ["user"] });
        console.log("Logout successful");
      },
      onError: (error) => {
        toast.error("Logout failed. Please try again.");
        console.error("Logout failed:", error);
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-9 cursor-pointer border border-primary/80 hover:border-primary  hover:scale-105 transition-transform duration-300">
          <AvatarImage src={user.imageUrl} alt={user.name} />
          <AvatarFallback>
            {user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {/* User Info */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-medium">{user.name}</p>

              <p className="truncate text-xs text-muted-foreground">
                {user.email}
              </p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Account */}
        <DropdownMenuGroup>
          {accountMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem
                className="cursor-pointer"
                key={item.title}
                asChild
              >
                <Link href={item.href}>
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
