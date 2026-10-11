import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateCategory() {
  return useMutation({
    mutationFn: createCategory,
  });
}

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}

export function useGetCategoryById(categoryId: string) {
  return useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryById(categoryId),
  });
}

export function useDeleteCategoryById() {
  return useMutation({
    mutationFn: (categoryId: string) => deleteCategoryById(categoryId),
  });
}
