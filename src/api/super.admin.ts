import apiClint from "@/lib/apiClint";
import { UserRole } from "@/types";

export function updateUserRole(id: string, role: UserRole) {
  return apiClint(`/admin/users/${id}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role }),
  });
}
