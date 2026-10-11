import { createCategory, getAllCategories } from "@/api";
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
