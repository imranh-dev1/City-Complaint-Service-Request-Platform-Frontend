import { Skeleton } from "../ui/skeleton";

export function DepartmentCardsSkeleton({ count = 6 }: { count?: number }) {
  const skeletonCount = Math.min(Math.max(count, 1), 10);
  const skeletonItems = Array.from({ length: skeletonCount }, (_, index) => ({
    id: `department-skeleton-${index + 1}`,
  }));
  const countItems = ["staff", "categories", "complaints"] as const;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skeletonItems.map(({ id }) => (
        <div key={id} className="rounded-xl border bg-card p-5">
          {/* Heading */}
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
            {countItems.map((countKey) => (
              <div
                key={countKey}
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
            <Skeleton className="h-3 w-32 max-w-[50%]" />
            <Skeleton className="h-3 w-28 max-w-[45%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
