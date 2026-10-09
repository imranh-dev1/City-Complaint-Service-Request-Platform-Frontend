import {
  createDepartment,
  getAllDepartments,
  getAllUsers,
  getDashboardStats,
  updateUserStatus,
} from "@/api";
import {
  AdminParams,
  DepartmentQueryParams,
  IcreateDepertment,
  UserStatus,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}

export function useGetAllUsers(params: AdminParams) {
  return useQuery({
    queryKey: ["dashboard-users", params],
    queryFn: () => getAllUsers(params),
  });
}

export function useUpdateUserStatus() {
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      updateUserStatus(id, status),
  });
}

export function useGetAllDepartments(params: DepartmentQueryParams) {
  return useQuery({
    queryKey: ["departments", params],
    queryFn: () => getAllDepartments(params),
  });
}

export function useCreateDepartment() {
  return useMutation({
    mutationFn: createDepartment,
  });
}
