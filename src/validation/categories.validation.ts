import z from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Category name must be at least 3 characters")
    .max(100, "Category name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters"),

  slaHours: z
    .number()
    .int("SLA hours must be a whole number")
    .min(1, "SLA hours must be at least 1")
    .max(720, "SLA hours cannot exceed 720 (30 days)")
    .optional(),

  departmentId: z.string().uuid("Invalid department ID"),
});
