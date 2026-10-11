"use client";

import type { ElementType, ReactNode } from "react";
import {
  Building2,
  CalendarDays,
  Clock,
  FileText,
  Hash,
  Users,
  ClipboardList,
  UserRound,
  CheckCircle2,
  XCircle,
  Layers3,
  RefreshCw,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDepartmentById } from "@/hooks";
import { DepartmentDetailsSkeleton } from "@/components/skeleton/department-details-skeleton";

interface DepartmentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
}

function formatDate(date?: string | null) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(parsedDate);
}

function InfoItem({
  icon: Icon,
  label,
  children,
}: {
  icon: ElementType;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="break-words text-sm font-medium">{children}</div>
      </div>
    </div>
  );
}

export function DepartmentDetailsModal({
  open,
  onOpenChange,
  departmentId,
}: DepartmentDetailsModalProps) {
  const { data, isPending, isError, refetch, isFetching } =
    useGetDepartmentById(departmentId);

  const department = data?.data;
  const categories = (
    department as
      | (NonNullable<typeof department> & {
          categories?: Array<{
            id: string;
            name: string;
            description?: string | null;
            isActive: boolean;
            slaHours: number;
          }>;
        })
      | undefined
  )?.categories;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-6xl">
        {/* Header */}
        <div className="border-b bg-muted/20 px-6 py-6 pr-12">
          <DialogHeader className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-background shadow-sm">
                <Building2 className="size-6 text-primary" />
              </div>

              <div className="min-w-0 space-y-1">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Department Details
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Department information and operational overview.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Loading state */}
        {isPending && <DepartmentDetailsSkeleton />}

        {/* Error state */}
        {!isPending && isError && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="size-7 text-destructive" />
            </div>

            <h3 className="text-base font-semibold">
              Unable to load department
            </h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Something went wrong while fetching department details. Please try
              again.
            </p>

            <div className="mt-5 flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>

              <Button onClick={() => refetch()} disabled={isFetching}>
                <RefreshCw
                  className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Try again
              </Button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isPending && !isError && !department && (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <Building2 className="mb-4 size-10 text-muted-foreground" />

            <h3 className="text-base font-semibold">Department not found</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              The department may have been removed or is no longer available.
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        )}

        {/* Loaded state */}
        {!isPending && !isError && department && (
          <div className="space-y-6 p-6">
            {/* Department identity */}
            <section className="space-y-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 space-y-2">
                  <h3 className="text-lg font-semibold leading-snug">
                    {department.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-1.5 font-mono">
                      <Hash className="size-3" />
                      {department.code}
                    </Badge>

                    <Badge
                      variant={department.isActive ? "default" : "secondary"}
                      className="gap-1.5"
                    >
                      {department.isActive ? (
                        <CheckCircle2 className="size-3" />
                      ) : (
                        <XCircle className="size-3" />
                      )}
                      {department.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                {department.description || "No description provided."}
              </p>
            </section>

            <Separator />

            {/* Statistics */}
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border bg-card p-4">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Users className="size-4 text-primary" />
                </div>

                <p className="text-2xl font-semibold tabular-nums">
                  {department._count?.staff ?? 0}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Total staff
                </p>
              </div>

              <div className="rounded-xl border bg-card p-4">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-muted">
                  <ClipboardList className="size-4 text-primary" />
                </div>

                <p className="text-2xl font-semibold tabular-nums">
                  {department._count?.complaints ?? 0}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Complaints</p>
              </div>

              <div className="col-span-2 rounded-xl border bg-card p-4 sm:col-span-1">
                <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-muted">
                  <Layers3 className="size-4 text-primary" />
                </div>

                <p className="text-2xl font-semibold tabular-nums">
                  {categories?.length ?? 0}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Categories</p>
              </div>
            </section>

            {/* General information */}
            <section className="space-y-4">
              <h4 className="text-sm font-semibold">General information</h4>

              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem icon={Building2} label="Department name">
                  {department.name}
                </InfoItem>

                <InfoItem icon={Hash} label="Department code">
                  <span className="font-mono">{department.code}</span>
                </InfoItem>

                <InfoItem icon={UserRound} label="Department manager">
                  {department.manager?.name ?? "Not assigned"}

                  {department.manager?.email && (
                    <p className="mt-1 break-all text-xs font-normal text-muted-foreground">
                      {department.manager.email}
                    </p>
                  )}
                </InfoItem>

                <InfoItem icon={CheckCircle2} label="Department status">
                  {department.isActive ? "Operational" : "Inactive"}
                </InfoItem>
              </div>
            </section>

            <Separator />

            {/* Department categories */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold">
                    Department categories
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Categories and their service-level agreements.
                  </p>
                </div>

                <Badge variant="secondary">
                  {categories?.length ?? 0} total
                </Badge>
              </div>

              {categories?.length ? (
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="rounded-xl border bg-card p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 space-y-1">
                          <p className="text-sm font-medium">{category.name}</p>

                          <p className="text-sm leading-5 text-muted-foreground">
                            {category.description ||
                              "No category description provided."}
                          </p>
                        </div>

                        <Badge
                          variant={category.isActive ? "outline" : "secondary"}
                          className="w-fit shrink-0"
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="size-4" />
                        <span>
                          SLA:{" "}
                          <span className="font-medium text-foreground">
                            {category.slaHours} hours
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed px-4 py-8 text-center">
                  <Layers3 className="mx-auto mb-3 size-8 text-muted-foreground" />

                  <p className="text-sm font-medium">No categories assigned</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Categories for this department will appear here.
                  </p>
                </div>
              )}
            </section>

            <Separator />

            {/* Record information */}
            <section className="space-y-4">
              <h4 className="text-sm font-semibold">Record information</h4>

              <div className="grid gap-5 sm:grid-cols-2">
                <InfoItem icon={CalendarDays} label="Created at">
                  {formatDate(department.createdAt)}
                </InfoItem>

                <InfoItem icon={Clock} label="Last updated">
                  {formatDate(department.updatedAt)}
                </InfoItem>
              </div>

              {department.deletedAt && (
                <InfoItem icon={XCircle} label="Deleted at">
                  {formatDate(department.deletedAt)}
                </InfoItem>
              )}

              <div className="rounded-lg bg-muted/40 p-3">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">
                      Department ID
                    </p>

                    <p className="mt-1 break-all font-mono text-xs">
                      {department.id}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <div className="flex justify-end border-t pt-4">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
