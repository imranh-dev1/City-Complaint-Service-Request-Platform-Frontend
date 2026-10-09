"use client";

import { useState } from "react";
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Clock,
  RefreshCw,
  Search,
  ShieldCheck,
} from "lucide-react";

import { useGetAllAuditLogs } from "@/hooks";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { IAuditLog } from "@/types";
import DataPagination from "@/components/shared/pagination";

const PAGE_SIZE = 20;

const entityTypes = ["COMPLAINT", "USER", "DEPARTMENT", "COMMENT", "SYSTEM"];

const actions = [
  "COMPLAINT_CREATED",
  "COMPLAINT_UPDATED",
  "COMPLAINT_STATUS_CHANGED",
  "USER_CREATED",
  "USER_ROLE_CHANGED",
  "USER_STATUS_CHANGED",
  "USER_DEPARTMENT_ASSIGNED",
  "DEPARTMENT_CREATED",
];

function formatLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return new Intl.DateTimeFormat("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getActionVariant(
  action: string,
): "default" | "destructive" | "secondary" | "outline" {
  if (action.includes("DELETED")) return "destructive";
  if (action.includes("CREATED")) return "default";

  if (
    action.includes("STATUS") ||
    action.includes("UPDATED") ||
    action.includes("CHANGED")
  ) {
    return "secondary";
  }

  return "outline";
}

export default function AuditLogsTable() {
  const [page, setPage] = useState(1);
  const [entityType, setEntityType] = useState("ALL");
  const [action, setAction] = useState("ALL");
  const [userId, setUserId] = useState("");

  // Build query parameters inside the table component
  const params = {
    page,
    limit: PAGE_SIZE,
    entityType: entityType === "ALL" ? undefined : entityType,
    action: action === "ALL" ? undefined : action,
    userId: userId.trim() || undefined,
  };

  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("limit", String(params.limit ?? 20));

  if (params.entityType) {
    searchParams.set("entityType", params.entityType);
  }

  if (params.action) {
    searchParams.set("action", params.action);
  }

  if (params.userId) {
    searchParams.set("userId", params.userId);
  }

  const queryString = searchParams.toString();

  const { data, isPending, isError, error, refetch, isFetching } =
    useGetAllAuditLogs(queryString);

  const logs: IAuditLog[] = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = Math.max(data?.meta?.totalPages ?? 1, 1);
  const currentPage = data?.meta?.page ?? page;

  function applyFilters() {
    setPage(1);
  }

  function resetFilters() {
    setEntityType("ALL");
    setAction("ALL");
    setUserId("");
    setPage(1);
  }

  function handlePageChange(nextPage: number) {
    if (nextPage < 1 || nextPage > totalPages) return;

    setPage(nextPage);
  }

  return (
    <div className="min-w-0 space-y-6 px-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" />
            <span>Administration</span>
            <span>/</span>
            <span className="font-medium text-foreground">Audit Logs</span>
          </div>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Audit Logs
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Review system activity, monitor user actions, and track important
              changes.
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="w-full gap-2 sm:w-auto"
        >
          <RefreshCw className={`size-4 ${isFetching ? "animate-spin" : ""}`} />
          Refresh data
        </Button>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="overflow-hidden shadow-none transition-colors hover:border-primary/40">
          <CardContent className="flex items-center justify-between p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Total activities
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular-nums">
                  {isPending ? "—" : total.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground">
                  All matching records
                </span>
              </div>
            </div>

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
              <Activity className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-none transition-colors hover:border-primary/40">
          <CardContent className="flex items-center justify-between p-5 sm:p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Current page
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold tracking-tight tabular-nums">
                  {currentPage}
                </span>
                <span className="text-sm text-muted-foreground">
                  of {totalPages}
                </span>
              </div>
            </div>

            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
              <Clock className="size-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-none">
        <CardHeader className="space-y-1 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg border bg-muted/40">
              <Search className="size-4 text-muted-foreground" />
            </div>
            <div>
              <CardTitle className="text-base">Filter activities</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Narrow down records by entity, action, or user.
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Entity type</label>
              <Select value={entityType} onValueChange={setEntityType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All entity types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All entity types</SelectItem>
                  {entityTypes.map((item) => (
                    <SelectItem key={item} value={item}>
                      {formatLabel(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Action type</label>
              <Select value={action} onValueChange={setAction}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All actions</SelectItem>
                  {actions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {formatLabel(item)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">User ID</label>
              <Input
                placeholder="Enter user ID..."
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") applyFilters();
                }}
                className="w-full"
              />
            </div>

            <div className="flex items-end gap-2">
              <Button variant="outline" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit history */}
      <Card className="overflow-hidden shadow-none">
        <CardHeader className="flex flex-col gap-3 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="space-y-1">
            <CardTitle className="text-base">Activity history</CardTitle>
            <p className="text-sm text-muted-foreground">
              A detailed record of actions performed across the system.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-md px-2.5 py-1">
            {isPending
              ? "Loading records..."
              : `${total.toLocaleString()} records`}
          </Badge>
        </CardHeader>

        <CardContent className="p-0">
          {isError ? (
            <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
                <Activity className="size-5 text-destructive" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Unable to load audit logs</p>
                <p className="max-w-md text-sm text-muted-foreground">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => void refetch()}
                disabled={isFetching}
              >
                <RefreshCw
                  className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
                />
                Try again
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                      <TableHead className="h-11 min-w-52 pl-5 font-medium sm:pl-6">
                        User
                      </TableHead>
                      <TableHead className="h-11 min-w-32 font-medium">
                        Action
                      </TableHead>
                      <TableHead className="h-11 min-w-40 font-medium">
                        Entity
                      </TableHead>
                      <TableHead className="h-11 min-w-64 font-medium">
                        Details
                      </TableHead>
                      <TableHead className="h-11 min-w-44 pr-5 font-medium sm:pr-6">
                        Date &amp; time
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isPending ? (
                      Array.from({ length: 5 }).map((_, index) => (
                        <TableRow key={index}>
                          {Array.from({ length: 5 }).map((_, cellIndex) => (
                            <TableCell key={cellIndex} className="py-5">
                              <Skeleton className="h-5 w-24" />
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : logs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-56 text-center">
                          <div className="flex flex-col items-center gap-3">
                            <div className="flex size-12 items-center justify-center rounded-full border bg-muted/40">
                              <Activity className="size-5 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium">No activity found</p>
                              <p className="text-sm text-muted-foreground">
                                Try adjusting your filters to find records.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={resetFilters}
                            >
                              Clear filters
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      logs.map((log) => (
                        <TableRow
                          key={log.id}
                          className="transition-colors hover:bg-muted/30"
                        >
                          {/* User */}
                          <TableCell className="py-4 pl-5 sm:pl-6">
                            <div className="flex items-start gap-3">
                              <div className="flex size-9 shrink-0 items-center justify-center rounded-full border bg-muted/50 text-xs font-semibold">
                                {(log.user?.name ?? "U")
                                  .trim()
                                  .slice(0, 1)
                                  .toUpperCase()}
                              </div>
                              <div className="min-w-0 space-y-1">
                                <p className="font-medium leading-5">
                                  {log.user?.name ?? "Unknown user"}
                                </p>
                                <p className="max-w-48 truncate text-xs text-muted-foreground">
                                  {log.user?.email ?? log.userId}
                                </p>
                                {log.user?.role && (
                                  <Badge
                                    variant="outline"
                                    className="text-[10px] font-normal"
                                  >
                                    {formatLabel(log.user.role)}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>

                          {/* Action */}
                          <TableCell className="py-4">
                            <Badge
                              variant={getActionVariant(log.action)}
                              className="whitespace-nowrap rounded-md font-medium"
                            >
                              {formatLabel(log.action)}
                            </Badge>
                          </TableCell>

                          {/* Entity */}
                          <TableCell className="py-4">
                            <div className="space-y-1.5">
                              <p className="text-sm font-medium">
                                {formatLabel(log.entityType)}
                              </p>
                              <p
                                className="max-w-40 truncate font-mono text-xs text-muted-foreground"
                                title={log.entityId}
                              >
                                ID: {log.entityId}
                              </p>
                            </div>
                          </TableCell>

                          {/* Metadata */}
                          <TableCell className="py-4">
                            <div className="max-w-72 space-y-1.5 text-sm">
                              {log.metadata &&
                              Object.keys(log.metadata).length > 0 ? (
                                Object.entries(log.metadata).map(
                                  ([key, value]) => (
                                    <p
                                      key={key}
                                      className="break-words leading-5"
                                    >
                                      <span className="text-muted-foreground">
                                        {formatLabel(key)}:
                                      </span>{" "}
                                      <span className="font-medium">
                                        {value !== null &&
                                        typeof value === "object"
                                          ? JSON.stringify(value)
                                          : String(value ?? "—")}
                                      </span>
                                    </p>
                                  ),
                                )
                              ) : (
                                <span className="text-muted-foreground">
                                  No additional details
                                </span>
                              )}
                            </div>
                          </TableCell>

                          {/* Timestamp */}
                          <TableCell className="whitespace-nowrap py-4 pr-5 text-sm text-muted-foreground sm:pr-6">
                            {formatDate(log.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="px-6">
                <DataPagination
                  page={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  isLoading={isFetching}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
