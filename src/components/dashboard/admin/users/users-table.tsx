"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  EditIcon,
  Ellipsis,
  Mail,
  Search,
  Shield,
  User,
  UserRound,
  Wrench,
  XCircle,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SelectedUser, UserRole, UsersResponse, UserStatus } from "@/types";

import { useGetAllUsers } from "@/hooks";

import { UsersSkeleton } from "@/components/skeleton/admin-users";
import ChangeStatusModal from "./change-status-modal";

const roleConfig: Record<
  UserRole,
  {
    label: string;
    icon: typeof UserRound;
  }
> = {
  CITIZEN: {
    label: "Citizen",
    icon: UserRound,
  },

  ADMIN: {
    label: "Admin",
    icon: Shield,
  },

  SUPER_ADMIN: {
    label: "Super Admin",
    icon: Shield,
  },

  TECHNICIAN: {
    label: "Technician",
    icon: Wrench,
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getRoleBadge(role: UserRole) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className="gap-1.5 border-primary/20 bg-primary/5 font-medium text-primary uppercase"
    >
      <Icon className="size-3.5" />
      {config.label}
    </Badge>
  );
}

function getStatusBadge(status: UserStatus) {
  if (status === "ACTIVE") {
    return (
      <Badge className="gap-1 border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15">
        <CheckCircle2 className="size-3.5" />
        Active
      </Badge>
    );
  }

  if (status === "BLOCKED") {
    return (
      <Badge className="gap-1 border border-yellow-500/20 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/15">
        <XCircle className="size-3.5" />
        Blocked
      </Badge>
    );
  }

  if (status === "DELETED") {
    return (
      <Badge className="gap-1 border border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/15">
        <XCircle className="size-3.5" />
        Deleted
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="gap-1">
      {status}
    </Badge>
  );
}

export default function UsersPage() {
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("ACTIVE");

  const [sortBy, setSortBy] = useState("createdAt");

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);

  const { data, isPending, isError } = useGetAllUsers({
    page,
    limit: 10,
    search,
    sortBy,
    sortOrder,
    role,
    status,
  });

  const response = data as UsersResponse | undefined;

  const users = response?.data ?? [];

  const meta = response?.meta;

  const totalPages = meta?.totalPages ?? 1;

  const totalUsers = meta?.total ?? 0;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleRoleChange = (value: string) => {
    setRole(value === "ALL" ? "" : value);

    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value === "ALL" ? "" : value);

    setPage(1);
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setPage(1);
  };

  const handleSortOrderChange = (value: "asc" | "desc") => {
    setSortOrder(value);
    setPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <UserRound className="size-5 text-primary" />
            </div>

            <h1 className="text-2xl font-bold tracking-tight">
              User Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage citizens, administrators and technicians.
          </p>
        </div>

        <Badge className="w-fit border border-primary/20 bg-primary/10 px-3 py-1.5 text-primary hover:bg-primary/15">
          <UserRound className="mr-1.5 size-3.5" />
          {totalUsers} Total Users
        </Badge>
      </div>

      {/* ================= FILTERS ================= */}

      <Card className="border-border/60">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 xl:flex-row">
            {/* Search */}

            <div className="relative min-w-0 flex-1">
              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  size-4
                  -translate-y-1/2
                  text-primary
                "
              />

              <Input
                value={search}
                onChange={(event) => handleSearch(event.target.value)}
                placeholder="Search by name or email..."
                className="
                  border-border/60
                  pl-9
                  transition-colors
                  focus-visible:border-primary
                  focus-visible:ring-primary/20
                "
              />
            </div>

            {/* Sort By */}

            <Select value={sortBy} onValueChange={handleSortByChange}>
              <SelectTrigger
                className="
                  w-full
                  border-border/60
                  focus:ring-primary/20
                  lg:w-45
                "
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="createdAt">Created Date</SelectItem>

                <SelectItem value="name">Name</SelectItem>

                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}

            <Select
              value={sortOrder}
              onValueChange={(value) =>
                handleSortOrderChange(value as "asc" | "desc")
              }
            >
              <SelectTrigger
                className="
                  w-full
                  border-border/60
                  focus:ring-primary/20
                  lg:w-40
                "
              >
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>

                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>

            {/* Role */}

            <Select value={role || "ALL"} onValueChange={handleRoleChange}>
              <SelectTrigger
                className="
                  w-full
                  border-border/60
                  focus:ring-primary/20
                  lg:w-45
                "
              >
                <SelectValue placeholder="All roles" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>

                <SelectItem value="CITIZEN">Citizen</SelectItem>

                <SelectItem value="ADMIN">Admin</SelectItem>

                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>

                <SelectItem value="TECHNICIAN">Technician</SelectItem>
              </SelectContent>
            </Select>

            {/* Status */}

            <Select value={status || "ALL"} onValueChange={handleStatusChange}>
              <SelectTrigger
                className="
                  w-full
                  border-border/60
                  focus:ring-primary/20
                  lg:w-40
                "
              >
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>

                <SelectItem value="ACTIVE">Active</SelectItem>

                <SelectItem value="BLOCKED">Blocked</SelectItem>

                <SelectItem value="DELETED">Deleted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ================= USERS ================= */}

      <Card className="overflow-hidden border-border/60">
        <CardHeader className="border-b bg-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Users</CardTitle>

              <p className="mt-1 text-xs text-muted-foreground">
                View and manage registered users.
              </p>
            </div>

            {!isPending && !isError && users.length > 0 && (
              <Badge
                variant="outline"
                className="border-primary/20 text-primary"
              >
                {users.length} shown
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* ================= LOADING ================= */}

          {isPending ? (
            <div className="p-4">
              <UsersSkeleton />
            </div>
          ) : isError ? (
            /* ================= ERROR ================= */

            <div className="flex min-h-75 flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-red-500/10">
                <CircleAlert className="size-6 text-red-500" />
              </div>

              <div>
                <h3 className="font-semibold">Failed to load users</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Something went wrong while loading the users.
                </p>
              </div>
            </div>
          ) : users.length === 0 ? (
            /* ================= EMPTY ================= */

            <div className="flex min-h-75 flex-col items-center justify-center gap-3 p-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="size-6 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">No users found</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  Try changing your search or filters.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ================= DESKTOP TABLE ================= */}

              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/20 text-left text-xs text-muted-foreground">
                      <th className="px-5 py-3 font-medium">User</th>

                      <th className="px-5 py-3 font-medium">Role</th>

                      <th className="px-5 py-3 font-medium">Status</th>

                      <th className="px-5 py-3 font-medium">Activity</th>

                      <th className="px-5 py-3 font-medium">Joined</th>

                      <th className="w-12 px-5 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        className="
                          border-b
                          last:border-0
                          transition-colors
                          hover:bg-primary/5
                        "
                      >
                        {/* User */}

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-10 border border-primary/10">
                              <AvatarImage
                                src={user.imageUrl || undefined}
                                alt={user.name}
                              />

                              <AvatarFallback className="bg-primary/10 font-medium text-primary">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="truncate font-medium">
                                  {user.name}
                                </p>

                                {user.emailVerified && (
                                  <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                                )}
                              </div>

                              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Mail className="size-3" />

                                <span className="max-w-60 truncate">
                                  {user.email}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Role */}

                        <td className="px-5 py-4">{getRoleBadge(user.role)}</td>

                        {/* Status */}

                        <td className="px-5 py-4">
                          {getStatusBadge(user.status)}
                        </td>

                        {/* Activity */}

                        <td className="px-5 py-4">
                          <div className="text-sm">
                            <p>
                              <span className="font-semibold text-primary">
                                {user._count.complaints}
                              </span>{" "}
                              complaints
                            </p>

                            <p className="text-xs text-muted-foreground">
                              {user._count.payments} payments
                            </p>
                          </div>
                        </td>

                        {/* Joined */}

                        <td className="px-5 py-4">
                          <div className="text-sm">
                            {formatDate(user.createdAt)}
                          </div>

                          <div className="text-xs text-muted-foreground">
                            {user.authProvider === "GOOGLE"
                              ? "Google"
                              : "Credential"}
                          </div>
                        </td>

                        {/* Actions */}

                        <td className="px-5 py-4 flex items-center justify-center gap-2">
                          <Button
                            variant="default"
                            onClick={() => setStatusModalOpen(true)}
                          >
                            <EditIcon /> Change Status
                          </Button>
                          <ChangeStatusModal
                            open={statusModalOpen}
                            onOpenChange={setStatusModalOpen}
                            user={selectedUser}
                          />
                          <Button
                            variant="outline"
                            onClick={() => setStatusModalOpen(true)}
                          >
                            <EditIcon /> Change Role
                          </Button>
                          <ChangeStatusModal
                            open={statusModalOpen}
                            onOpenChange={setStatusModalOpen}
                            user={selectedUser}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ================= MOBILE ================= */}

              <div className="divide-y md:hidden">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="
                      space-y-4
                      p-4
                      transition-colors
                      hover:bg-primary/5
                    "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="size-11 border border-primary/10">
                          <AvatarImage
                            src={user.imageUrl || undefined}
                            alt={user.name}
                          />

                          <AvatarFallback className="bg-primary/10 font-medium text-primary">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate font-medium">{user.name}</p>

                            {user.emailVerified && (
                              <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                            )}
                          </div>

                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="
                              size-8
                              shrink-0
                              hover:bg-primary/10
                              hover:text-primary
                            "
                          >
                            <Ellipsis className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>

                          <DropdownMenuItem>Edit User</DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem>Change Status</DropdownMenuItem>

                          <DropdownMenuItem>Change Role</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {getRoleBadge(user.role)}

                      {getStatusBadge(user.status)}
                    </div>

                    <div className="grid grid-cols-3 gap-3 rounded-lg border border-primary/10 bg-primary/5 p-3">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Complaints
                        </p>

                        <p className="mt-1 font-semibold text-primary">
                          {user._count.complaints}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">
                          Payments
                        </p>

                        <p className="mt-1 font-semibold text-primary">
                          {user._count.payments}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground">Joined</p>

                        <p className="mt-1 text-sm font-medium">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* ================= PAGINATION ================= */}

      {!isPending && !isError && users.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page{" "}
            <span className="font-medium text-foreground">
              {meta?.page ?? page}
            </span>{" "}
            of <span className="font-medium text-foreground">{totalPages}</span>
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((current) => current - 1)}
              className="
                  hover:border-primary
                  hover:text-primary
                "
            >
              <ChevronLeft className="mr-1 size-4" />
              Previous
            </Button>

            <Button
              size="sm"
              className="
                  min-w-9
                  bg-primary
                  text-primary-foreground
                  hover:bg-primary/90
                "
            >
              {page}
            </Button>

            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
              className="
                  hover:border-primary
                  hover:text-primary
                "
            >
              Next
              <ChevronRight className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
