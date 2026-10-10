"use client";

import { useState } from "react";
import {
  ArrowDownUp,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  MessageSquare,
  Search,
  Tags,
  Users,
  X,
} from "lucide-react";

import { useGetAllDepartments } from "@/hooks";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DataPagination from "@/components/shared/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { DepartmentDetailsModal } from "./department-details-modal";
import { DepartmentMeta } from "@/types";

const sortOptions = {
  newest: {
    sortBy: "createdAt",
    sortOrder: "desc" as const,
  },
  oldest: {
    sortBy: "createdAt",
    sortOrder: "asc" as const,
  },
  "name-asc": {
    sortBy: "name",
    sortOrder: "asc" as const,
  },
  "name-desc": {
    sortBy: "name",
    sortOrder: "desc" as const,
  },
  "code-asc": {
    sortBy: "code",
    sortOrder: "asc" as const,
  },
};

type SortOption = keyof typeof sortOptions;

export default function Departments() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("active");
  const [sort, setSort] = useState<SortOption>("newest");

  const { data, isPending, isError, isFetching, refetch } =
    useGetAllDepartments({
      page,
      limit: Number(limit),
      search: search.trim() || undefined,
      isActive: status === "all" ? undefined : status === "active",
      ...sortOptions[sort],
    });

  const departments = data?.data ?? [];

  const meta: DepartmentMeta = data?.meta ?? {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const totalPages = meta.totalPages;
  const totalDepartments = meta.total;

  const isLoading = isPending || isFetching;

  const hasFilters =
    search !== "" || status !== "active" || sort !== "newest" || limit !== "10";

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [departmentId, setDepartmentId] = useState<string | null>(null);

  const resetFilters = () => {
    setSearch("");
    setStatus("active");
    setSort("newest");
    setLimit("10");
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="min-h-screen space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4" />
            <span>Administration</span>
            <ChevronRight className="size-3" />
            <span>Departments</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Departments
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage departments, staff assignments, and service activity.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start rounded-xl border bg-card px-4 py-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Total departments</p>

            {isPending ? (
              <Skeleton className="mt-1 h-6 w-12" />
            ) : (
              <p className="text-xl font-bold tabular-nums">
                {totalDepartments}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="mb-4">
          <h2 className="font-semibold">Department directory</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Search, filter, and organize your departments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_170px_190px_140px_auto]">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search name or code..."
              value={search}
              onChange={(event) => handleSearch(event.target.value)}
              className="pl-9 pr-9 focus-visible:ring-primary"
            />

            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => handleSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Status filter */}
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active only</SelectItem>
              <SelectItem value="inactive">Inactive only</SelectItem>
            </SelectContent>
          </Select>

          {/* Sorting */}
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value as SortOption);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <ArrowDownUp className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder="Sort departments" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="name-asc">Name: A–Z</SelectItem>
              <SelectItem value="name-desc">Name: Z–A</SelectItem>
              <SelectItem value="code-asc">Code: A–Z</SelectItem>
            </SelectContent>
          </Select>

          {/* Page size */}
          <Select
            value={limit}
            onValueChange={(value) => {
              setLimit(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="20">20 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
            </SelectContent>
          </Select>

          {/* Reset */}
          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="gap-2"
          >
            <X className="size-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Results information */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {isPending ? "—" : departments.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {isPending ? "—" : totalDepartments}
          </span>{" "}
          departments
        </p>

        {isFetching && !isPending && (
          <p className="flex items-center gap-2 text-xs text-primary">
            <span className="size-2 animate-pulse rounded-full bg-primary" />
            Updating results...
          </p>
        )}
      </div>

      {/* Department list */}
      {isLoading ? (
        <DepartmentCardsSkeleton count={Number(limit)} />
      ) : isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-12 text-center">
          <CircleAlert className="mx-auto mb-3 size-8 text-destructive" />

          <h3 className="font-semibold">Unable to load departments</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>

          <Button variant="outline" className="mt-4" onClick={() => refetch()}>
            Try again
          </Button>
        </div>
      ) : departments.length === 0 ? (
        <div className="rounded-xl border border-dashed px-5 py-16 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Building2 className="size-7" />
          </div>

          <h3 className="font-semibold">No departments found</h3>

          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Try changing your search or filters to find departments.
          </p>

          {hasFilters && (
            <Button variant="outline" className="mt-4" onClick={resetFilters}>
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {departments.map((department) => (
            <article
              key={department.id}
              className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
            >
              {/* Department heading */}
              <div className="flex items-start gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-primary/5 text-primary">
                  <Building2 className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold leading-5">
                      {department.name}
                    </h3>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${
                        department.isActive
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {department.isActive ? (
                        <CheckCircle2 className="size-3" />
                      ) : (
                        <Clock3 className="size-3" />
                      )}

                      {department.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <p className="mt-1 text-xs font-medium tracking-wide text-muted-foreground">
                    {department.code}
                  </p>
                </div>

                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setDepartmentId(department.id);
                    setDetailsOpen(true);
                  }}
                >
                  View details
                </Button>
              </div>

              {/* Description */}
              <p className="mt-4 min-h-10 text-sm leading-5 text-muted-foreground">
                {department.description || "No description provided."}
              </p>

              {/* Department counts */}
              <div className="mt-5 grid grid-cols-3 divide-x rounded-lg border bg-muted/20 py-3">
                <CountItem
                  icon={Users}
                  label="Staff"
                  value={department._count.staff}
                />

                <CountItem
                  icon={Tags}
                  label="Categories"
                  value={department._count.categories}
                />

                <CountItem
                  icon={MessageSquare}
                  label="Complaints"
                  value={department._count.complaints}
                />
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3 text-xs text-muted-foreground">
                <span className="flex min-w-0 items-center gap-1.5">
                  <CalendarDays className="size-3.5 shrink-0" />
                  <span className="truncate">
                    Created{" "}
                    {new Date(department.createdAt).toLocaleDateString()}
                  </span>
                </span>

                <span className="max-w-[45%] truncate text-right">
                  {department.manager?.name ?? "No manager assigned"}
                </span>
              </div>
            </article>
          ))}

          {departmentId && (
            <DepartmentDetailsModal
              open={detailsOpen}
              onOpenChange={setDetailsOpen}
              departmentId={departmentId}
            />
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && departments.length > 0 && (
        <DataPagination
          page={meta?.page ?? page}
          totalPages={totalPages}
          isLoading={isFetching}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

/* Department card skeletons */
function DepartmentCardsSkeleton({ count = 6 }: { count?: number }) {
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

/* Department count item */
function CountItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) {
  return (
    <div className="flex min-w-0 flex-col items-center gap-1 px-1 text-center">
      <Icon className="size-4 text-primary" />

      <span className="text-base font-semibold tabular-nums">{value}</span>

      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
