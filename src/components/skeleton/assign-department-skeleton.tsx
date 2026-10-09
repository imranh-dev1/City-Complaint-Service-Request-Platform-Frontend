import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AssignDepartmentSkeleton() {
  return (
    <div className="flex items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl border-border shadow-sm">
        {/* Header */}
        <CardHeader className="space-y-4">
          <Skeleton className="size-12 rounded-xl" />

          <div className="space-y-2">
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-4 w-full max-w-md" />
            <Skeleton className="h-4 w-3/4 max-w-sm" />
          </div>
        </CardHeader>

        {/* Form fields */}
        <CardContent className="space-y-6">
          {/* Technician */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-11 w-full rounded-md" />
            <Skeleton className="h-3 w-64 max-w-full" />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Skeleton className="h-10 w-full sm:w-20" />
            <Skeleton className="h-10 w-full sm:w-44" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
