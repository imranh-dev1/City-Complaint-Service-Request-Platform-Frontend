"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { type DepartmentFormValues, departmentSchema } from "@/validation";
import { useGetDepartmentById, useUpdateDepartment } from "@/hooks";
import UpdateDepartmentSkeleton from "../skeleton/UpdateDepartmentSkeleton";

interface UpdateDepartmentFormProps {
  departmentId: string;
  onSuccess?: () => void;
}

export default function UpdateDepartmentForm({
  departmentId,
  onSuccess,
}: UpdateDepartmentFormProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useGetDepartmentById(departmentId);

  const department = data?.data;

  const { mutateAsync: updateDepartment, isPending } = useUpdateDepartment();

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (!department) return;

    form.reset({
      name: department.name,
      code: department.code,
      description: department.description ?? "",
      isActive: department.isActive,
    });
  }, [department, form]);

  if (isLoading) {
    return <UpdateDepartmentSkeleton />;
  }

  if (isError || !department) {
    return (
      <p className="py-8 text-center text-sm text-destructive">
        Unable to load department. Please try again.
      </p>
    );
  }

  const onSubmit = async (values: DepartmentFormValues) => {
    const payload = {
      name: values.name.trim(),
      code: values.code.trim().toUpperCase(),
      description: values.description?.trim() ?? "",
      isActive: values.isActive,
    };

    updateDepartment(
      { departmentId: department.id, payload },
      {
        onSuccess: () => {
          toast.success("Department updated successfully!");

          queryClient.invalidateQueries({
            queryKey: ["departments"],
          });

          queryClient.invalidateQueries({
            queryKey: ["department", department.id],
          });

          onSuccess?.();
        },
        onError: () => {
          toast.error("Failed to update department. Please try again.");
        },
      },
    );
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <FieldGroup>
        <Field data-invalid={!!form.formState.errors.name}>
          <FieldLabel htmlFor="name">Department Name</FieldLabel>

          <Input
            id="name"
            placeholder="e.g. Waste Management"
            aria-invalid={!!form.formState.errors.name}
            {...form.register("name")}
          />

          <FieldDescription>Enter a unique department name.</FieldDescription>

          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.code}>
          <FieldLabel htmlFor="code">Department Code</FieldLabel>

          <Input
            id="code"
            placeholder="e.g. ROAD"
            aria-invalid={!!form.formState.errors.code}
            {...form.register("code", {
              onChange: (event) => {
                event.target.value = event.target.value.toUpperCase();
              },
            })}
          />

          <FieldDescription>
            Use a unique code, such as ROAD or HEALTH.
          </FieldDescription>

          <FieldError>{form.formState.errors.code?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.description}>
          <FieldLabel htmlFor="description">Description</FieldLabel>

          <Textarea
            id="description"
            placeholder="Describe the department's responsibilities..."
            className="min-h-28 resize-y"
            aria-invalid={!!form.formState.errors.description}
            {...form.register("description")}
          />

          <FieldError>{form.formState.errors.description?.message}</FieldError>
        </Field>

        <Field orientation="horizontal">
          <div className="flex-1 space-y-1">
            <FieldLabel htmlFor="isActive">Active Department</FieldLabel>

            <FieldDescription>
              Enable or disable this department.
            </FieldDescription>
          </div>

          <Switch
            id="isActive"
            checked={form.watch("isActive")}
            onCheckedChange={(checked) =>
              form.setValue("isActive", checked, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          />
        </Field>
      </FieldGroup>

      <div className="flex justify-end gap-3 border-t pt-5">
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={() =>
            form.reset({
              name: department.name,
              code: department.code,
              description: department.description ?? "",
              isActive: department.isActive,
            })
          }
        >
          Reset
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isPending ? "Updating..." : "Update Department"}
        </Button>
      </div>
    </form>
  );
}
