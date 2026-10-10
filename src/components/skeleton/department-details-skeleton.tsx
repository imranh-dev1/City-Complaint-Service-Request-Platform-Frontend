"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function DepartmentDetailsSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Department identity */}
      <section className="space-y-3">
        <Skeleton className="h-7 w-56 max-w-full" />

        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </section>

      <Separator />

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className={`rounded-xl border bg-card p-4 ${
              item === 3 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <Skeleton className="mb-3 size-9 rounded-lg" />
            <Skeleton className="h-7 w-12" />
            <Skeleton className="mt-2 h-3 w-24 max-w-full" />
          </div>
        ))}
      </section>

      {/* General information */}
      <section className="space-y-4">
        <Skeleton className="h-5 w-40" />

        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex gap-3">
              <Skeleton className="size-9 shrink-0 rounded-lg" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-4 w-36 max-w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Department categories */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {[1, 2].map((item) => (
          <div key={item} className="rounded-xl border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-36 max-w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>

              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <Separator className="my-3" />

            <Skeleton className="h-4 w-28" />
          </div>
        ))}
      </section>

      <Separator />

      {/* Record information */}
      <section className="space-y-4">
        <Skeleton className="h-5 w-36" />

        <div className="grid gap-6 sm:grid-cols-2">
          {[1, 2].map((item) => (
            <div key={item} className="flex gap-3">
              <Skeleton className="size-9 shrink-0 rounded-lg" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-36 max-w-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Department ID */}
        <Skeleton className="h-16 w-full rounded-lg" />
      </section>

      {/* Footer */}
      <div className="flex justify-end border-t pt-4">
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
