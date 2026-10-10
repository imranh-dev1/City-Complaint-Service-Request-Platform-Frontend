
"use client";

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
  X,
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
import { useGetDepartmentById } from "@/hooks";

interface DepartmentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string ;
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
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          {label}
        </p>
        <div className="break-words text-sm font-medium">
          {children}
        </div>
      </div>
    </div>
  );
}

export function DepartmentDetailsModal({
  open,
  onOpenChange,
  departmentId,
}: DepartmentDetailsModalProps) {

    const {data, isPending, isError} = useGetDepartmentById(departmentId)

   const department = data?.data;
    
   console.log("get by id",department);
   

  if (!department) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        {/* Header */}
        <div className="relative border-b bg-muted/20 px-6 py-6 pr-12">
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
              <p className="mt-1 text-xs text-muted-foreground">
                Complaints
              </p>
            </div>

            <div className="col-span-2 rounded-xl border bg-card p-4 sm:col-span-1">
              <div className="mb-3 flex size-9 items-center justify-center rounded-lg bg-muted">
                <Layers3 className="size-4 text-primary" />
              </div>
              {/* <p className="text-2xl font-semibold tabular-nums">
                {department.categories.length}
              </p> */}
              <p className="mt-1 text-xs text-muted-foreground">
                Categories
              </p>
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

              {/* <InfoItem icon={Layers3} label="Department categories">
                {department?.categories && department?.categories > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {department.categories.map((category, index) => (
                      <Badge
                        key={category.id ?? category.name ?? index}
                        variant="secondary"
                      >
                        {category.name ?? "Unnamed category"}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="font-normal text-muted-foreground">
                    No categories assigned
                  </span>
                )}
              </InfoItem> */}
            </div>
          </section>

          <Separator />

          {/* Timestamps */}
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
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
