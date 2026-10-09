import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters.")
    .max(100, "Department name cannot exceed 100 characters."),

  code: z
    .string()
    .trim()
    .min(2, "Department code is required.")
    .max(20, "Department code cannot exceed 20 characters.")
    .regex(
      /^[A-Z0-9_-]+$/,
      "Use uppercase letters, numbers, hyphens, or underscores.",
    ),

  description: z
    .string()
    .trim()
    .min(1, "Description is required.")
    .max(500, "Description cannot exceed 500 characters."),

  isActive: z.boolean(),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;

export const assignDepartmentSchema = z.object({
  userId: z.string().min(1, "Please select a technician."),
  departmentId: z.string().min(1, "Please select a department."),
});

export type AssignDepartmentFormValues = z.infer<typeof assignDepartmentSchema>;
