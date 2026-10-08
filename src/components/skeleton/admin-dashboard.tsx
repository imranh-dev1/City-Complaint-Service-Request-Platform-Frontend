import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-3 w-32" />
                </div>

                <Skeleton className="size-10 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users + Complaints */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-52" />
          </CardHeader>

          <CardContent className="space-y-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Skeleton className="size-9 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-6" />
                  </div>

                  <Skeleton className="h-2 w-full" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Complaint Overview */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>

          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-36" />
                </div>

                <Skeleton className="h-6 w-10 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* SLA + Categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* SLA */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="rounded-xl border p-5">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="size-5 rounded" />
                  </div>

                  <Skeleton className="mt-4 h-9 w-12" />

                  <Skeleton className="mt-3 h-6 w-24 rounded-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>

          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-lg" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>

                <Skeleton className="size-4 rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Feedback + Resources */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Feedback */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between rounded-xl border p-5">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-20" />
              </div>

              <div className="space-y-2 text-right">
                <Skeleton className="ml-auto h-4 w-24" />
                <Skeleton className="ml-auto h-8 w-12" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-56" />
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="rounded-xl border p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="size-9 rounded-lg" />

                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-10" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Complaints */}
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>

        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
              </div>

              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
