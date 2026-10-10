import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function DepartmentTechniciansSkeleton() {
  return (
    <section className="space-y-5">
      {/* Section heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      {/* Cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {[1, 2, 3, 4].map((item) => (
          <article key={item} className="min-w-0 rounded-xl border bg-card p-5">
            {/* Profile header */}
            <div className="flex items-start gap-3">
              <Skeleton className="size-12 shrink-0 rounded-xl" />

              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-5 w-36 max-w-full" />
                <Skeleton className="h-4 w-48 max-w-full" />

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Performance metrics */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((metric) => (
                <div key={metric} className="rounded-lg bg-muted/40 p-3">
                  <Skeleton className="h-4 w-28 max-w-full" />
                  <Skeleton className="mt-3 h-6 w-16" />
                </div>
              ))}
            </div>

            {/* Contact and rate */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1 space-y-3">
                <Skeleton className="h-4 w-48 max-w-full" />
                <Skeleton className="h-4 w-32 max-w-full" />
              </div>

              <Skeleton className="h-14 w-28 rounded-lg" />
            </div>

            <div className="mt-4 border-t pt-3">
              <Skeleton className="h-4 w-36" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
