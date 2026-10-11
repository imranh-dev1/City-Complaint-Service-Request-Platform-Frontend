import { Skeleton } from "@/components/ui/skeleton";

export function CategoryDetailsSkeleton() {
  const departmentDetails = Array.from(
    { length: 6 },
    (_, index) => `department-detail-${index + 1}`,
  );

  return (
    <div className="space-y-7 px-6 py-6 sm:px-8">
      {/* Category information */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>

        <div className="grid gap-5 rounded-xl border p-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-36" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-5 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-2 sm:col-span-2 lg:col-span-3">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </section>

      <Skeleton className="h-px w-full" />

      {/* Department information */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>

        <div className="space-y-5 rounded-xl border p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48 max-w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <Skeleton className="h-px w-full" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departmentDetails.map((detailKey) => (
              <div key={detailKey} className="space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-36 max-w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Skeleton className="h-px w-full" />

      {/* Complaint statistics */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3 w-56" />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border p-5">
          <Skeleton className="size-12 shrink-0 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-12" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </section>

      <Skeleton className="h-px w-full" />

      {/* Record information */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="size-8 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-52" />
          </div>
        </div>

        <div className="grid gap-5 rounded-xl border p-5 sm:grid-cols-2">
          {["created-at", "updated-at"].map((record) => (
            <div key={record} className="flex items-start gap-3">
              <Skeleton className="mt-1 size-4 shrink-0 rounded" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-40 max-w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
