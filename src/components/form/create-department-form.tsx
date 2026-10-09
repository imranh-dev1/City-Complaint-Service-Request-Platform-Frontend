"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

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
import { useCreateDepartment } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function CreateDepartmentForm() {
  const { mutateAsync: createDepartment, isPending } = useCreateDepartment();
  const queryClient = useQueryClient();
  const router = useRouter();

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      isActive: true,
    },
  });

  const onSubmit = async (values: DepartmentFormValues) => {
    const payload = {
      name: values.name,
      code: values.code,
      description: values.description,
    };

    createDepartment(payload, {
      onSuccess: () => {
        toast.success("Department Created successfully!");
        queryClient.invalidateQueries({
          queryKey: ["departments"],
        });
        form.reset();
      },
      onError: (err) => {
        toast.error("Failed to create department.");
      },
    });
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
          onClick={() => form.reset()}
        >
          Reset
        </Button>

        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isPending ? "Creating..." : "Create Department"}
        </Button>
      </div>
    </form>
  );
}
