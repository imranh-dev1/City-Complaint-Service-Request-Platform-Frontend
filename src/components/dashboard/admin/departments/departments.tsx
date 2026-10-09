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
import DepartmentSkeleton from "@/components/skeleton/department-skeleton";

const sortOptions = {
  newest: { sortBy: "createdAt", sortOrder: "desc" as const },
  oldest: { sortBy: "createdAt", sortOrder: "asc" as const },
  "name-asc": { sortBy: "name", sortOrder: "asc" as const },
  "name-desc": { sortBy: "name", sortOrder: "desc" as const },
  "code-asc": { sortBy: "code", sortOrder: "asc" as const },
};

export default function Departments() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState("10");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("active");
  const [sort, setSort] = useState<keyof typeof sortOptions>("newest");

  const { data, isPending, isError, isFetching } = useGetAllDepartments({
    page,
    limit: Number(limit),
    search: search.trim() || undefined,
    isActive: status === "all" ? undefined : status === "active",
    ...sortOptions[sort],
  });

  const departments = data?.data ?? [];
  const totalPages = 1;
  const totalDepartments = departments.length;

  const resetFilters = () => {
    setSearch("");
    setStatus("active");
    setSort("newest");
    setLimit("10");
    setPage(1);
  };

  const hasFilters =
    search !== "" || status !== "active" || sort !== "newest" || limit !== "10";

  if (isPending) {
    return <DepartmentSkeleton />;
  }

  return (
    <div className="min-h-screen space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="size-4" />
            Administration
            <ChevronRight className="size-3" />
            Departments
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Departments
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage departments, staff assignments, and service activity.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl border bg-card px-4 py-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="size-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Total departments</p>
            <p className="text-xl font-bold tabular-nums">{totalDepartments}</p>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard
          title="Departments found"
          value={totalDepartments}
          description="Matching your filters"
          icon={Building2}
        />

        <SummaryCard
          title="Staff members"
          value={departments.reduce((sum, item) => sum + item._count.staff, 0)}
          description="On this page"
          icon={Users}
        />

        <SummaryCard
          title="Complaints"
          value={departments.reduce(
            (sum, item) => sum + item._count.complaints,
            0,
          )}
          description="Across departments on this page"
          icon={MessageSquare}
        />
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <div className="mb-4 flex flex-col gap-1">
          <h2 className="font-semibold">Department directory</h2>
          <p className="text-sm text-muted-foreground">
            Search, filter, and organize your departments.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(220px,1fr)_170px_190px_120px_auto]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search name or code..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              className="pl-9 pr-9 focus-visible:ring-primary"
            />
            {search && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

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

          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value as keyof typeof sortOptions);
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

          <Button
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

      {/* Results */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {departments.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">
            {totalDepartments}
          </span>{" "}
          departments
        </p>

        {isFetching && !isPending && (
          <p className="text-xs text-primary">Updating results...</p>
        )}
      </div>

      {isPending ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-xl border bg-muted/40"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-12 text-center">
          <CircleAlert className="mx-auto mb-3 size-8 text-destructive" />
          <h3 className="font-semibold">Unable to load departments</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
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
              </div>

              <p className="mt-4 min-h-10 text-sm leading-5 text-muted-foreground">
                {department.description || "No description provided."}
              </p>

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

              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="size-3.5" />
                  Created {new Date(department.createdAt).toLocaleDateString()}
                </span>
                <span className="max-w-[45%] truncate">
                  {department.manager?.name ?? "No manager assigned"}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {!isPending && !isError && departments.length > 0 && (
        <DataPagination
          page={page}
          totalPages={totalPages}
          isLoading={isFetching}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight tabular-nums">
            {value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}

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
