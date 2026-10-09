import apiClint from "@/lib/apiClint";
import { AdminParams, ApiResponse, IUser } from "@/types";

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
  console.log(id, status);

  return apiClint(`/admin/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
}
