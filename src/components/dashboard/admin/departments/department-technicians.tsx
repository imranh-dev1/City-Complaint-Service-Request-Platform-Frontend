"use client";

import {
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Phone,
  Star,
  UserRound,
  BadgeCheck,
  Wrench,
  RefreshCw,
  Mail,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetDepartmentTechnicians } from "@/hooks";
import { DepartmentTechniciansSkeleton } from "@/components/skeleton/department-technicians-skeleton";

interface DepartmentTechniciansProps {
  departmentId: string;
}

export function DepartmentTechnicians({
  departmentId,
}: DepartmentTechniciansProps) {
  const { data, isPending, isError, refetch, isFetching } =
    useGetDepartmentTechnicians(departmentId);

  const technicians = data?.data ?? [];

  if (isPending) {
    return <DepartmentTechniciansSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <Wrench className="mx-auto mb-3 size-10 text-muted-foreground" />
        <h3 className="font-semibold">Unable to load technicians</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Please check your connection and try again.
        </p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Try again
        </Button>
      </div>
    );
  }

  if (technicians.length === 0) {
    return (
      <div className="rounded-xl border border-dashed px-6 py-14 text-center">
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted">
          <Wrench className="size-7 text-muted-foreground" />
        </div>
        <h3 className="font-semibold">No technicians assigned</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          There are currently no technicians assigned to this department.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      {/* Section heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold tracking-tight">
            Department technicians
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            View technician profiles, skills, and availability.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit">
          {technicians.length}{" "}
          {technicians.length === 1 ? "technician" : "technicians"}
        </Badge>
      </div>

      {/* Technician cards */}
      <div className="grid gap-4 lg:grid-cols-2">
        {technicians.map((item) => {
          const technician = item.technician;

          const isAvailable = technician.availability === "AVAILABLE";

          return (
            <article
              key={item.id}
              className="group min-w-0 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
            >
              {/* Profile header */}
              <div className="flex items-start gap-3">
                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-6 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="break-words font-semibold">{item.name}</h4>

                    {technician.isVerified && (
                      <Badge
                        variant="outline"
                        className="gap-1 border-primary/30 text-primary"
                      >
                        <BadgeCheck className="size-3.5" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {item.email}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="gap-1">
                      <Wrench className="size-3" />
                      {technician.specialization}
                    </Badge>

                    <Badge
                      variant={isAvailable ? "default" : "outline"}
                      className="gap-1"
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          isAvailable ? "bg-background" : "bg-muted-foreground"
                        }`}
                      />
                      {technician.availability}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Performance metrics */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BriefcaseBusiness className="size-4" />
                    <span className="text-xs">Experience</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold tabular-nums">
                    {technician.experience}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      years
                    </span>
                  </p>
                </div>

                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Star className="size-4" />
                    <span className="text-xs">Rating</span>
                  </div>
                  <p className="mt-2 flex items-center gap-1 text-lg font-semibold tabular-nums">
                    {technician.rating.toFixed(1)}
                    <Star className="size-3.5 fill-current text-amber-500" />
                  </p>
                </div>

                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <BriefcaseBusiness className="size-4" />
                    <span className="text-xs">Completed jobs</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold tabular-nums">
                    {technician.totalJobs}
                  </p>
                </div>

                <div className="rounded-lg bg-muted/40 p-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span className="text-xs">Service radius</span>
                  </div>
                  <p className="mt-2 text-lg font-semibold tabular-nums">
                    {technician.serviceRadius}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      km
                    </span>
                  </p>
                </div>
              </div>

              {/* Contact and rate */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 shrink-0" />
                    <span className="break-all">{item.email}</span>
                  </div>

                  {item.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="size-4 shrink-0" />
                      <span>{item.phone}</span>
                    </div>
                  )}
                </div>

                <div className="shrink-0 rounded-lg border px-3 py-2 sm:text-right">
                  <p className="text-xs text-muted-foreground">Hourly rate</p>
                  <p className="font-semibold tabular-nums">
                    ${technician.hourlyRate}
                    <span className="text-xs font-normal text-muted-foreground">
                      /hr
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
                <Clock3 className="size-3.5" />
                <span>
                  Account status:{" "}
                  <span className="font-medium text-foreground">
                    {item.status}
                  </span>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
