"use client";

import {
  Activity,
  AlertTriangle,
  Building2,
  CreditCard,
  FileWarning,
  Tags,
  Users,
  Clock3,
  MessageSquare,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDashboardStats } from "@/hooks/admin.hook";
import DashboardSkeleton from "@/components/skeleton/admin-dashboard";
import { DashboardData, UserRole } from "@/types";

const roleConfig: Record<
  UserRole,
  {
    label: string;
    icon: React.ElementType;
  }
> = {
  CITIZEN: {
    label: "Citizens",
    icon: Users,
  },

  ADMIN: {
    label: "Admins",
    icon: ShieldIcon,
  },

  SUPER_ADMIN: {
    label: "Super Admins",
    icon: ShieldIcon,
  },

  TECHNICIAN: {
    label: "Technicians",
    icon: WrenchIcon,
  },
};

export default function SuperAdminDashboard() {
  const { data: response, isLoading, isError } = useDashboardStats();

  const data = response?.data as DashboardData | undefined;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-6">
        <EmptyState
          icon={Activity}
          title="Unable to load dashboard"
          description="Something went wrong while loading the dashboard statistics. Please try again."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Activity className="size-5 text-primary" />

          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        </div>

        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your city service platform and system activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={data.users.total}
          description="Registered users"
          icon={Users}
        />

        <StatCard
          title="Total Complaints"
          value={data.complaints.total}
          description="All service requests"
          icon={FileWarning}
        />

        <StatCard
          title="Total Revenue"
          value={`৳${Number(data.payments.totalRevenue).toLocaleString()}`}
          description={`${data.payments.paid} paid payments`}
          icon={CreditCard}
        />

        <StatCard
          title="Departments"
          value={data.resources.departments}
          description={`${data.resources.categories} categories`}
          icon={Building2}
        />
      </div>

      {/* Users + Complaints */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users by Role */}
        <Card>
          <CardHeader>
            <CardTitle>Users by Role</CardTitle>

            <CardDescription>Distribution of registered users</CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {data.users.byRole.length === 0 ? (
              <EmptyState
                icon={Users}
                title="No users found"
                description="User statistics will appear here when users register."
              />
            ) : (
              data.users.byRole.map((item) => {
                const config = roleConfig[item.role];

                const Icon = config?.icon ?? Users;

                const percentage =
                  data.users.total > 0
                    ? Math.round((item._count / data.users.total) * 100)
                    : 0;

                return (
                  <div key={item.role} className="flex items-center gap-4">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {config?.label ?? item.role}
                        </span>

                        <span className="text-sm text-muted-foreground">
                          {item._count}
                        </span>
                      </div>

                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <p className="mt-1 text-right text-xs text-muted-foreground">
                        {percentage}%
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Complaint Status */}
        <Card>
          <CardHeader>
            <CardTitle>Complaint Overview</CardTitle>

            <CardDescription>
              Current complaint status distribution
            </CardDescription>
          </CardHeader>

          <CardContent>
            {data.complaints.byStatus.length === 0 ? (
              <EmptyState
                icon={FileWarning}
                title="No complaints yet"
                description="Complaint statistics will appear here once citizens submit complaints."
              />
            ) : (
              <div className="space-y-4">
                {data.complaints.byStatus.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {formatStatus(item.status)}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Complaint status
                      </p>
                    </div>

                    <Badge variant="secondary">{item._count}</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SLA + Categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* SLA */}
        <Card>
          <CardHeader>
            <CardTitle>SLA Overview</CardTitle>

            <CardDescription>
              Monitor service-level agreement status
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Breached */}
              <div className="rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Breached
                  </span>

                  <AlertTriangle className="size-5 text-destructive" />
                </div>

                <p className="mt-3 text-3xl font-bold">
                  {data.complaints.sla.breached}
                </p>

                <Badge
                  variant={
                    data.complaints.sla.breached > 0
                      ? "destructive"
                      : "secondary"
                  }
                  className="mt-2"
                >
                  {data.complaints.sla.breached > 0
                    ? "Needs attention"
                    : "All clear"}
                </Badge>
              </div>

              {/* Approaching */}
              <div className="rounded-xl border p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Approaching
                  </span>

                  <Clock3 className="size-5 text-primary" />
                </div>

                <p className="mt-3 text-3xl font-bold">
                  {data.complaints.sla.approaching}
                </p>

                <Badge variant="secondary" className="mt-2">
                  {data.complaints.sla.approaching > 0
                    ? "Monitor closely"
                    : "No urgent cases"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>

            <CardDescription>Most requested service categories</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {data.topCategories.length === 0 ? (
              <EmptyState
                icon={Tags}
                title="No categories found"
                description="Service categories will appear here."
              />
            ) : (
              data.topCategories.map((category, index) => (
                <div key={category.id} className="flex items-center gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {category.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {category._count.complaints} complaints
                    </p>
                  </div>

                  <Tags className="size-4 text-muted-foreground" />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Feedback + Resources */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback Overview</CardTitle>

            <CardDescription>Citizen satisfaction summary</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between rounded-xl border p-5">
              <div>
                <p className="text-sm text-muted-foreground">Average Rating</p>

                <p className="mt-2 text-3xl font-bold">
                  {data.feedback.averageRating.toFixed(1)}
                  <span className="ml-1 text-sm font-normal text-muted-foreground">
                    / 5
                  </span>
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Feedback</p>

                <p className="mt-2 text-2xl font-bold">{data.feedback.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>

            <CardDescription>Available platform resources</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            <ResourceItem
              icon={Building2}
              label="Departments"
              value={data.resources.departments}
            />

            <ResourceItem
              icon={Tags}
              label="Categories"
              value={data.resources.categories}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>

          <CardDescription>
            Latest complaints submitted by citizens
          </CardDescription>
        </CardHeader>

        <CardContent>
          {data.complaints.recent.length === 0 ? (
            <EmptyState
              icon={FileWarning}
              title="No recent complaints"
              description="There are no complaints to display right now."
            />
          ) : (
            <div className="space-y-3">
              {data.complaints.recent.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {complaint.title ?? "Complaint"}
                    </p>

                    {complaint.status && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatStatus(complaint.status)}
                      </p>
                    )}
                  </div>

                  <Badge variant="secondary">
                    {formatStatus(complaint.status ?? "UNKNOWN")}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* --------------------------------
   Stat Card
--------------------------------- */

function StatCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>

            <p className="mt-2 text-2xl font-bold tracking-tight">{value}</p>

            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="size-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* --------------------------------
   Resource Item
--------------------------------- */

function ResourceItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="size-4 text-primary" />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">{label}</p>

          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------
   Empty State
--------------------------------- */

function EmptyState({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="size-5 text-muted-foreground" />
      </div>

      <p className="mt-3 text-sm font-medium">{title}</p>

      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

/* --------------------------------
   Helpers
--------------------------------- */

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/* --------------------------------
   Icons
--------------------------------- */

function ShieldIcon({ className }: { className?: string }) {
  return <Users className={className} />;
}

function WrenchIcon({ className }: { className?: string }) {
  return <Activity className={className} />;
}
