"use client";

import {
  Building2,
  CalendarDays,
  Clock3,
  FileText,
  MessageSquare,
  Tags,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useGetCategoryById } from "@/hooks";
import { CategoryDetailsSkeleton } from "@/components/skeleton/category-details-skeleton";

interface CategoryDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="break-words text-sm font-medium">{value}</p>
    </div>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function CategoryDetails({
  open,
  onOpenChange,
  categoryId,
}: CategoryDetailsDialogProps) {
  const { data, isLoading, isError, refetch } = useGetCategoryById(categoryId);

  const category = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex max-h-[90dvh] !w-[calc(100%-1rem)] !max-w-4xl
          flex-col gap-0 overflow-hidden rounded-2xl border
          p-0 shadow-2xl sm:w-full
        "
      >
        {/* Header */}
        <DialogHeader className="shrink-0 border-b bg-muted/20 px-6 py-5 sm:px-8">
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Tags className="size-6" />
            </div>

            <div className="min-w-0 flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <DialogTitle className="text-lg font-semibold sm:text-xl">
                  Category Details
                </DialogTitle>

                {category && (
                  <Badge
                    variant="outline"
                    className={
                      category.isActive
                        ? "border-primary/20 bg-primary/10 text-primary"
                        : "border-muted text-muted-foreground"
                    }
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                )}
              </div>

              <DialogDescription className="text-sm leading-5">
                View category information, department assignment, and complaint
                statistics.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable content — scrollbar hidden */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {isLoading ? (
            <CategoryDetailsSkeleton />
          ) : isError || !category ? (
            <div className="flex min-h-72 flex-col items-center justify-center gap-3 px-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <AlertCircle className="size-6" />
              </div>

              <div className="space-y-1">
                <h3 className="font-semibold">Unable to load category</h3>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Something went wrong while fetching the category details.
                  Please try again.
                </p>
              </div>

              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : (
            <div className="space-y-7 px-6 py-6 sm:px-8">
              {/* Category overview */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <FileText className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Category Information
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Basic details and resolution target
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Category Name
                    </p>
                    <p className="font-semibold">{category.name}</p>
                  </div>

                  <DetailItem
                    label="Resolution SLA"
                    value={`${category.slaHours} hours`}
                  />

                  <DetailItem
                    label="Status"
                    value={category.isActive ? "Active" : "Inactive"}
                  />

                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Description
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {category.description || "No description provided."}
                    </p>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Category ID
                    </p>
                    <p className="break-all font-mono text-xs text-muted-foreground">
                      {category.id}
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Department */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Building2 className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Assigned Department
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Department responsible for this category
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border bg-card p-5">
                  {category.department ? (
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <h4 className="font-semibold">
                            {category.department.name}
                          </h4>
                          <p className="text-sm leading-6 text-muted-foreground">
                            {category.department.description ||
                              "No department description available."}
                          </p>
                        </div>

                        <Badge variant="secondary" className="shrink-0">
                          {category.department.code}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        <DetailItem
                          label="Department Status"
                          value={
                            category.department.isActive ? "Active" : "Inactive"
                          }
                        />

                        <DetailItem
                          label="Department Manager"
                          value={
                            category.department.managerId || "Not assigned"
                          }
                        />

                        <div className="space-y-1.5 sm:col-span-2 lg:col-span-1">
                          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            Department ID
                          </p>
                          <p className="break-all font-mono text-xs">
                            {category.department.id}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No department information available.
                    </p>
                  )}
                </div>
              </section>

              <Separator />

              {/* Complaint statistics */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageSquare className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Complaint Statistics
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Complaints associated with this category
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border bg-card p-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="size-5" />
                  </div>

                  <div>
                    <p className="text-2xl font-bold tabular-nums">
                      {category._count?.complaints ?? 0}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total complaints
                    </p>
                  </div>
                </div>
              </section>

              <Separator />

              {/* Record information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <CalendarDays className="size-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      Record Information
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Creation and modification timestamps
                    </p>
                  </div>
                </div>

                <div className="grid gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Created At
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(category.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(category.updatedAt)}
                      </p>
                    </div>
                  </div>

                  {category.deletedAt && (
                    <div className="space-y-1 sm:col-span-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Deleted At
                      </p>
                      <p className="text-sm font-medium">
                        {formatDate(category.deletedAt)}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
