"use client";

import {
    User,
    Settings,
    LogOut,
    ShieldCheck,
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

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { IUser } from "@/types"; 

export default function UserDropdown({ user }: { user: IUser }) {
    const handleLogout = () => {
        // logout API call here
        console.log("Logout");
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="size-9 cursor-pointer border border-primary/80 hover:border-primary  hover:scale-105 transition-transform duration-300">
                    <AvatarImage
                        src={user.imageUrl}
                        alt={user.name}
                    />
                    <AvatarFallback>
                        {user?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64"
            >
                {/* User Info */}
                <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                            <AvatarImage
                                src={user.imageUrl}
                                alt={user.name}
                            />
                            <AvatarFallback>
                                {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex min-w-0 flex-col">
                            <p className="truncate text-sm font-medium">
                                {user.name}
                            </p>

                            <p className="truncate text-xs text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Account */}
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User className="size-4" />
                        Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Settings className="size-4" />
                        Settings
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <ShieldCheck className="size-4" />
                        Security
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut className="size-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}