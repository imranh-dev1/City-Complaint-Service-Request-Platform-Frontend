"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, Plus, Tags } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateCategory, useGetAllDepartments } from "@/hooks";
import { createCategorySchema } from "@/validation/categories.validation";
import { useQueryClient } from "@tanstack/react-query";

type CategoryFormValues = z.infer<typeof createCategorySchema>;

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const defaultValues: CategoryFormValues = {
  name: "",
  description: "",
  slaHours: 72,
  departmentId: "",
};

export function CreateCategory({
  open,
  onOpenChange,
}: CreateCategoryDialogProps) {
  const queryClient = useQueryClient();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues,
  });

  const { mutate: createCategory, isPending, isError } = useCreateCategory();

  const {
    data: departmentResponse,
    isLoading: isDepartmentsLoading,
    isError: isDepartmentsError,
    refetch: refetchDepartments,
  } = useGetAllDepartments({
    page: 1,
    isActive: true,
  });

  const departments = departmentResponse?.data ?? [];

  const onSubmit = (values: CategoryFormValues) => {
    createCategory(
      {
        name: values.name.trim(),
        description: values?.description.trim(),
        slaHours: values.slaHours,
        departmentId: values.departmentId,
      },
      {
        onSuccess: () => {
          toast.success("Category created successfully.");
          form.reset(defaultValues);
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          onOpenChange(false);
        },
        onError: () => {
          toast.error("Failed to create category. Please try again.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Tags className="size-5" />
          </div>

          <DialogTitle>Create Category</DialogTitle>

          <DialogDescription>
            Create a service category and assign it to a department.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Category name */}
          <div className="space-y-2">
            <Label htmlFor="category-name">
              Category Name <span className="text-destructive">*</span>
            </Label>

            <Input
              id="category-name"
              placeholder="e.g. Road Damage"
              disabled={isPending}
              aria-invalid={!!form.formState.errors.name}
              {...form.register("name")}
            />

            {form.formState.errors.name && (
              <p className="text-sm text-destructive">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="category-description">
              Description <span className="text-destructive">*</span>
            </Label>

            <Textarea
              id="category-description"
              placeholder="Potholes, cracks and damaged road surfaces"
              rows={3}
              className="resize-none"
              disabled={isPending}
              aria-invalid={!!form.formState.errors.description}
              {...form.register("description")}
            />

            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* SLA hours */}
          <div className="space-y-2">
            <Label htmlFor="category-sla">
              Resolution SLA (hours) <span className="text-destructive">*</span>
            </Label>

            <Input
              id="category-sla"
              type="number"
              min={1}
              step={1}
              disabled={isPending}
              aria-invalid={!!form.formState.errors.slaHours}
              {...form.register("slaHours", {
                valueAsNumber: true,
              })}
            />

            {form.formState.errors.slaHours && (
              <p className="text-sm text-destructive">
                {form.formState.errors.slaHours.message}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Target time to resolve complaints, measured in hours.
            </p>
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="category-department">
              Department <span className="text-destructive">*</span>
            </Label>

            <Select
              value={form.watch("departmentId")}
              onValueChange={(value) => {
                form.setValue("departmentId", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              disabled={isDepartmentsLoading || isDepartmentsError || isPending}
            >
              <SelectTrigger
                id="category-department"
                className="h-10 w-full"
                aria-invalid={!!form.formState.errors.departmentId}
              >
                <SelectValue
                  placeholder={
                    isDepartmentsLoading
                      ? "Loading departments..."
                      : "Select a department"
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {departments.map((department) => (
                  <SelectItem key={department.id} value={department.id}>
                    {department.name} ({department.code})
                    {!department.isActive && " — Inactive"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {form.formState.errors.departmentId && (
              <p className="text-sm text-destructive">
                {form.formState.errors.departmentId.message}
              </p>
            )}

            {isDepartmentsError && (
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-destructive">
                  Failed to load departments.
                </p>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => refetchDepartments()}
                >
                  Retry
                </Button>
              </div>
            )}

            {!isDepartmentsLoading &&
              !isDepartmentsError &&
              departments.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No departments found.
                </p>
              )}
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={
                isPending ||
                isDepartmentsLoading ||
                isDepartmentsError ||
                departments.length === 0
              }
              className="gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="size-4" />
                  Create Category
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
