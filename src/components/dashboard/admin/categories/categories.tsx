"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDownUp,
  Clock3,
  FileText,
  FolderKanban,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CategoriesSkeleton } from "@/components/skeleton/categories-skeleton";
import { useGetAllCategories, useGetMe } from "@/hooks";
import { ICategory, IDepartment } from "@/types";
import { CreateCategory } from "./create-category-dialog";

const ITEMS_PER_PAGE = 9;

export default function Categories() {
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [page, setPage] = useState(1);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } = useGetAllCategories();
  const { data: userData } = useGetMe();

  const user = userData?.data;

  const categories: ICategory[] = data?.data ?? [];

  // Get unique departments from categories
  const departments = useMemo(() => {
    const uniqueDepartments = new Map<string, IDepartment>();

    categories.forEach((category) => {
      if (category.department) {
        uniqueDepartments.set(category.department.id, category.department);
      }
    });

    return Array.from(uniqueDepartments.values());
  }, [categories]);

  // Search, filter, and sort categories
  const filteredCategories = useMemo(() => {
    const result = categories.filter((category) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        category.name.toLowerCase().includes(searchText) ||
        (category.description ?? "").toLowerCase().includes(searchText) ||
        (category.department?.name ?? "").toLowerCase().includes(searchText);

      const matchesDepartment =
        departmentFilter === "all" ||
        category.departmentId === departmentFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && category.isActive) ||
        (statusFilter === "inactive" && !category.isActive);

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    return result.sort((a, b) => {
      if (sortBy === "sla") {
        return a.slaHours - b.slaHours;
      }

      if (sortBy === "complaints") {
        return (b._count?.complaints ?? 0) - (a._count?.complaints ?? 0);
      }

      return a.name.localeCompare(b.name);
    });
  }, [categories, search, departmentFilter, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / ITEMS_PER_PAGE),
  );

  const paginatedCategories = filteredCategories.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const activeCount = categories.filter((category) => category.isActive).length;

  const totalComplaints = categories.reduce(
    (total, category) => total + (category._count?.complaints ?? 0),
    0,
  );

  const resetFilters = () => {
    setSearch("");
    setDepartmentFilter("all");
    setStatusFilter("all");
    setSortBy("name");
    setPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FolderKanban className="size-4" />
            <span>Management</span>
            <span>/</span>
            <span>Categories</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Categories
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage service categories, departments, and resolution time targets.
          </p>
        </div>

        {(user && user.role === "ADMIN") ||
          (user.role === "SUPER_ADMIN" && (
            <>
              <Button
                className="shrink-0 gap-2"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="size-4" />
                Add Category
              </Button>

              <CreateCategory
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
              />
            </>
          ))}
      </div>

      {/* Loading state */}
      {isLoading && <CategoriesSkeleton count={6} />}

      {/* Error state */}
      {isError && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle className="size-10 text-destructive" />

            <h3 className="font-semibold">Failed to load categories</h3>

            <p className="text-sm text-muted-foreground">
              Please check your connection and try again.
            </p>

            <Button variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main content */}
      {!isLoading && !isError && (
        <>
          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Categories"
              value={categories.length}
              icon={<FolderKanban className="size-5" />}
              description="All service categories"
            />

            <StatCard
              title="Active Categories"
              value={activeCount}
              icon={<FileText className="size-5" />}
              description="Currently available"
            />

            <StatCard
              title="Departments"
              value={departments.length}
              icon={<SlidersHorizontal className="size-5" />}
              description="Departments represented"
            />

            <StatCard
              title="Total Complaints"
              value={totalComplaints}
              icon={<AlertCircle className="size-5" />}
              description="Across all categories"
            />
          </div>

          {/* Filters */}
          <Card className="gap-0 py-0">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <div className="relative min-w-0 flex-1">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                  <Input
                    placeholder="Search categories or departments..."
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(1);
                    }}
                    className="!h-8 pl-9"
                  />
                </div>

                <Select
                  value={departmentFilter}
                  onValueChange={(value) => {
                    setDepartmentFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="!h-8 w-full lg:w-[210px]">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All departments</SelectItem>

                    {departments.map((department) => (
                      <SelectItem key={department.id} value={department.id}>
                        {department.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="!h-8 w-full lg:w-[150px]">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value);
                    setPage(1);
                  }}
                >
                  <SelectTrigger className="!h-8 w-full lg:w-41.25">
                    <ArrowDownUp className="mr-2 size-4 text-muted-foreground" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="sla">Shortest SLA</SelectItem>
                    <SelectItem value="complaints">Most complaints</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  className="!h-8 shrink-0"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results heading */}
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">All categories</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {filteredCategories.length} categories found
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={() => refetch()}>
              Refresh
            </Button>
          </div>

          {/* Category cards */}
          {paginatedCategories.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {paginatedCategories.map((category) => (
                <Card
                  key={category.id}
                  className="group rounded-xl border p-0 py-0 transition-colors hover:border-primary/40"
                >
                  <CardHeader className="space-y-3 p-5 pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FolderKanban className="size-5" />
                      </div>

                      <Badge
                        variant="outline"
                        className={
                          category.isActive
                            ? "border-primary/20 bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        }
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <CardTitle className="text-base">
                        {category.name}
                      </CardTitle>

                      <p className="line-clamp-2 text-sm leading-5 text-muted-foreground">
                        {category.description || "No description available."}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 p-5 pt-2">
                    {/* Department */}
                    <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/30 p-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" />

                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">
                            Department
                          </p>

                          <p className="truncate text-sm font-medium">
                            {category.department?.name ?? "Unassigned"}
                          </p>
                        </div>
                      </div>

                      {category.department?.code && (
                        <Badge variant="outline" className="shrink-0">
                          {category.department.code}
                        </Badge>
                      )}
                    </div>

                    {/* SLA and complaints */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock3 className="size-3.5" />
                          Resolution SLA
                        </div>

                        <p className="text-lg font-semibold">
                          {category.slaHours}
                          <span className="ml-1 text-sm font-normal text-muted-foreground">
                            hours
                          </span>
                        </p>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <FileText className="size-3.5" />
                          Complaints
                        </div>

                        <p className="text-lg font-semibold">
                          {category._count?.complaints ?? 0}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between gap-3 border-t pt-3">
                      <span className="text-xs text-muted-foreground">
                        Updated{" "}
                        {new Date(category.updatedAt).toLocaleDateString()}
                      </span>

                      <Button variant="default" size="sm" onClick={() => {}}>
                        View details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Empty state */
            <Card>
              <CardContent className="flex flex-col items-center gap-3 py-16 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Search className="size-5" />
                </div>

                <h3 className="font-semibold">No categories found</h3>

                <p className="max-w-sm text-sm text-muted-foreground">
                  Try changing your search or filters to find categories.
                </p>

                <Button variant="outline" onClick={resetFilters}>
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Pagination */}
          {filteredCategories.length > ITEMS_PER_PAGE && (
            <div className="flex flex-col justify-between gap-3 border-t pt-4 sm:flex-row sm:items-center">
              <p className="text-sm text-muted-foreground">
                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(page * ITEMS_PER_PAGE, filteredCategories.length)} of{" "}
                {filteredCategories.length}
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((current) => current - 1)}
                >
                  Previous
                </Button>

                <span className="px-2 text-sm tabular-nums">
                  {page} / {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="gap-3 py-5">
      <CardContent className="flex items-start justify-between gap-3 px-5">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="text-2xl font-bold tracking-tight">{value}</p>

          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-lg border border-primary/20 bg-primary/10 p-2.5 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
