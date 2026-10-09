import { Skeleton } from "@/components/ui/skeleton";

export default function DepartmentSkeleton() {
  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-3">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-9 w-56" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <div className="flex items-center gap-3 rounded-xl border p-3">
          <Skeleton className="size-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-36" />
              </div>
              <Skeleton className="size-10 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Search and filters */}
      <div className="space-y-4 rounded-xl border bg-card p-4 sm:p-5">
        <div className="space-y-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_170px_190px_120px_auto]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>

      {/* Results label */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Department cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-xl border bg-card p-5">
            {/* Department heading */}
            <div className="flex items-start gap-3">
              <Skeleton className="size-12 shrink-0 rounded-xl" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-40 max-w-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Counts */}
            <div className="mt-5 grid grid-cols-3 divide-x rounded-lg border py-3">
              {Array.from({ length: 3 }).map((_, countIndex) => (
                <div
                  key={countIndex}
                  className="flex flex-col items-center gap-2 px-2"
                >
                  <Skeleton className="size-4 rounded" />
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-3 w-14 max-w-full" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
              <Skeleton className="h-3 w-32 max-w-full" />
              <Skeleton className="h-3 w-28 max-w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-4 w-28" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-10" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
    </div>
  );
}
