"use client";

import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Building2, Users, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import {
  AssignDepartmentFormValues,
  assignDepartmentSchema,
} from "@/validation";

import {
  useAssignDepartment,
  useGetAllDepartments,
  useGetAllUsers,
} from "@/hooks";
import AssignDepartmentSkeleton from "../skeleton/assign-department-skeleton";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AssignDepartmentForm() {
  const {
    data: usersResponse,
    isPending: usersPending,
    isError: usersError,
  } = useGetAllUsers({ role: "TECHNICIAN" });

  const {
    data: departmentsResponse,
    isPending: departmentsPending,
    isError: departmentsError,
  } = useGetAllDepartments({ isActive: true });

  // Adjust these lines if your API returns a different response shape.
  const technicians = useMemo(() => usersResponse?.data ?? [], [usersResponse]);

  const departments = useMemo(
    () => departmentsResponse?.data ?? [],
    [departmentsResponse],
  );

  const form = useForm<AssignDepartmentFormValues>({
    resolver: zodResolver(assignDepartmentSchema),
    defaultValues: {
      userId: "",
      departmentId: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const userId = watch("userId");
  const departmentId = watch("departmentId");
  const selectedUser = technicians.find((user) => user.id === userId);

  const selectedDepartment = departments.find(
    (department) => department.id === departmentId,
  );
  const queryClient = useQueryClient()

  const isLoading = usersPending || departmentsPending;
  const hasError = usersError || departmentsError;

  const {
    mutate: assignDepartment,
    isPending,
    isError,
  } = useAssignDepartment();

  const handleFormSubmit = async (values: AssignDepartmentFormValues) => {
    assignDepartment(
      { userId: values.userId, departmentId: values.departmentId },
      {
        onSuccess: (res) => {
          reset();
          queryClient.invalidateQueries({ queryKey: ["users"] });
          queryClient.invalidateQueries({ queryKey: ["departments"] });
          toast.success(res.meassage || "Assigned to department successfully");
        },
        onError: (err) => {
          toast.error("Assigned to department Error");
        },
      },
    );
  };

  if (isLoading) {
    return <AssignDepartmentSkeleton />;
  }

  if (hasError) {
    return (
      <div className="rounded-lg border border-destructive/30 p-6 text-center">
        <p className="text-sm text-destructive">
          Failed to load technicians or departments.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Please refresh the page and try again.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Technician */}
      <div className="space-y-2">
        <label
          htmlFor="technician-select"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Users className="size-4 text-muted-foreground" />
          Technician
          <span className="text-destructive">*</span>
        </label>

        <Controller
          name="userId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger id="technician-select" className="h-11 w-full">
                <SelectValue placeholder="Select a technician" />
              </SelectTrigger>

              <SelectContent>
                {technicians.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} — {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.userId && (
          <p className="text-sm text-destructive">{errors.userId.message}</p>
        )}

        {technicians.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No technicians are currently available.
          </p>
        )}
      </div>

      {/* Department */}
      <div className="space-y-2">
        <label
          htmlFor="department-select"
          className="flex items-center gap-2 text-sm font-medium"
        >
          <Building2 className="size-4 text-muted-foreground" />
          Department
          <span className="text-destructive">*</span>
        </label>

        <Controller
          name="departmentId"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={isSubmitting}
            >
              <SelectTrigger id="department-select" className="h-11 w-full">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>

              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name} ({department.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {errors.departmentId && (
          <p className="text-sm text-destructive">
            {errors.departmentId.message}
          </p>
        )}

        {departments.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No active departments are available.
          </p>
        )}
      </div>

      {/* Assignment Summary */}
      {selectedUser && selectedDepartment && (
        <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
          <h3 className="text-sm font-semibold">Assignment Summary</h3>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Technician</span>
            <span className="text-right font-medium">{selectedUser.name}</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Role</span>
            <span className="font-medium">{selectedUser.role}</span>
          </div>

          <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Department</span>
            <span className="text-right font-medium">
              {selectedDepartment.name}
            </span>
          </div>
        </div>
      )}

      <Separator />

      {/* Actions */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() => reset()}
        >
          Reset
        </Button>

        <Button
          type="submit"
          disabled={
            isPending || technicians.length === 0 || departments.length === 0
          }
        >
          {isPending ? "Assigning..." : "Assign Department"}

          {!isPending && <ArrowRight className="ml-2 size-4" />}
        </Button>
      </div>
    </form>
  );
}
