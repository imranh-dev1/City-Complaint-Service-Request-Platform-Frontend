import apiClint from "@/lib/apiClint";
import {
  AdminParams,
  ApiResponse,
  Department,
  DepartmentQueryParams,
  IcreateDepertment,
  IUser,
} from "@/types";

export function getDashboardStats() {
  return apiClint("/admin/dashboard-stats", {
    method: "GET",
  });
}

export function getAllUsers(params: AdminParams) {
  return apiClint<ApiResponse<IUser[]>>("/admin/users", {
    params: params,
    method: "GET",
  });
}

export function updateUserStatus(id: string, status: string) {
  return apiClint(`/admin/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
}

export function getAllDepartments(params: DepartmentQueryParams) {
  return apiClint<ApiResponse<Department[]>>("/departments", {
    params: params,
    method: "GET",
  });
}

export function createDepartment(payload: IcreateDepertment) {
  return apiClint("/departments", {
    method: "POST",
    body: payload,
  });
}

export function assignDepartment(userId: string, departmentId: string) {
  return apiClint(`/admin/users/${userId}/department`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ departmentId }),
  });
}
