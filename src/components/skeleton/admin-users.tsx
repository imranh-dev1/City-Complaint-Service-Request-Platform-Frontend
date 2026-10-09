import { Skeleton } from "../ui/skeleton";

export function UsersSkeleton() {
  return (
    <div className="space-y-3">
      {[
        "user-skeleton-1",
        "user-skeleton-2",
        "user-skeleton-3",
        "user-skeleton-4",
        "user-skeleton-5",
        "user-skeleton-6",
        "user-skeleton-7",
      ].map((skeletonKey) => (
        <div
          key={skeletonKey}
          className="flex items-center gap-4 rounded-xl border p-4"
        >
          <Skeleton className="size-10 rounded-full" />

          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-52" />
          </div>

          <Skeleton className="hidden h-6 w-24 md:block" />
          <Skeleton className="hidden h-6 w-20 lg:block" />
          <Skeleton className="hidden h-4 w-16 xl:block" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      ))}
    </div>
  );
}
