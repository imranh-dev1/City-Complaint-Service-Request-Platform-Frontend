"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  RefreshCw,
  Search,
  Users,
  Wrench,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useGetAllDepartments } from "@/hooks";
import { DepartmentTechnicians } from "./department-technicians";

export function DepartmentTechniciansByDepartment() {
  const [departmentId, setDepartmentId] = useState("");
  const [search, setSearch] = useState("");

  const { data, isPending, isError, refetch, isFetching } =
    useGetAllDepartments({
      isActive: true,
      search,
    });

  const departments = data?.data ?? [];

  const selectedDepartment = departments.find(
    (department) => department.id === departmentId,
  );

  return (
    <div className="space-y-6 px-6">
      {/* Page heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4" />
            Department management
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">
            Department technicians
          </h2>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Select a department to inspect its technicians, availability,
            experience, and service coverage.
          </p>
        </div>

        <Badge variant="outline" className="w-fit gap-2 px-3 py-1.5">
          <Users className="size-3.5" />
          {isPending ? "Loading..." : `${departments.length} departments`}
        </Badge>
      </div>

      {/* Selection panel */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center gap-3 bg-muted/20 px-5 py-4 sm:px-6">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border bg-background">
            <Building2 className="size-5 text-primary" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold">Choose a department</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Search by department name or code.
            </p>
          </div>

          {isFetching && !isPending && (
            <RefreshCw className="size-4 animate-spin text-muted-foreground" />
          )}
        </div>

        <Separator />

        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.85fr)]">
          {/* Search and select */}
          <div className="space-y-2">
            <label htmlFor="department-select" className="text-sm font-medium ">
              Department
            </label>

            <Select
              value={departmentId}
              onValueChange={setDepartmentId}
              disabled={isPending || isError}
            >
              <SelectTrigger
                id="department-select"
                className="!h-10 min-h-10 w-full bg-background"
              >
                <SelectValue placeholder="Select a department..." />
              </SelectTrigger>

              <SelectContent>
                {departments.length > 0 ? (
                  departments.map((department) => (
                    <SelectItem key={department.id} value={department.id}>
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Building2 className="size-4 text-muted-foreground" />
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium">{department.name}</p>
                          <p className="text-xs text-muted-foreground text-left">
                            {department.code}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                    No matching departments found.
                  </div>
                )}
              </SelectContent>
            </Select>

            <p className="text-xs text-muted-foreground">
              {departments.length > 0
                ? `${departments.length} active departments available`
                : "Available departments will appear here."}
            </p>
          </div>

          {/* Independent search field */}
          <div className="space-y-2">
            <label htmlFor="department-search" className="text-sm font-medium">
              Find department
            </label>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="department-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Name or code..."
                className="h-10 bg-background pl-9 pr-9"
                disabled={isError}
              />

              {search && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 size-9 -translate-y-1/2"
                  aria-label="Clear department search"
                  onClick={() => setSearch("")}
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              {search
                ? `${departments.length} matching departments`
                : "Search to narrow the selection."}
            </p>
          </div>
        </div>

        {/* Loading state */}
        {isPending && (
          <div className="space-y-3 px-5 pb-5 sm:px-6 sm:pb-6">
            <Skeleton className="h-14 w-full rounded-xl" />
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="mx-5 mb-5 flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-4 sm:mx-6 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Could not load departments</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Check your connection and retry.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw
                className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
              />
              Retry
            </Button>
          </div>
        )}

        {/* Selected department summary */}
        {selectedDepartment && (
          <>
            <Separator />

            <div className="flex flex-col gap-4 bg-muted/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border bg-background">
                  <Building2 className="size-5 text-primary" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Selected department
                  </p>
                  <p className="mt-1 break-words font-semibold">
                    {selectedDepartment.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {selectedDepartment.code}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <Badge
                  variant={
                    selectedDepartment.isActive ? "default" : "secondary"
                  }
                  className="gap-1.5"
                >
                  {selectedDepartment.isActive ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <X className="size-3.5" />
                  )}
                  {selectedDepartment.isActive ? "Active" : "Inactive"}
                </Badge>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDepartmentId("")}
                >
                  Reset
                </Button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Technicians result area */}
      {departmentId ? (
        <DepartmentTechnicians key={departmentId} departmentId={departmentId} />
      ) : (
        <section className="flex flex-col items-center justify-center rounded-2xl border border-dashed px-5 py-14 text-center sm:py-16">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border bg-muted/50">
            <Wrench className="size-6 text-muted-foreground" />
          </div>

          <h3 className="font-semibold tracking-tight">
            No department selected
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
            Choose a department above to load its technician list, availability,
            performance, and service details.
          </p>

          <Button
            variant="outline"
            className="mt-5"
            onClick={() => {
              document.querySelector("select")?.focus();
            }}
            disabled={isPending || isError}
          >
            <ChevronDown className="mr-2 size-4" />
            Select a department
          </Button>
        </section>
      )}
    </div>
  );
}
