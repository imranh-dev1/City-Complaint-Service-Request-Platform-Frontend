import apiClint from "@/lib/apiClint";

export function getDashboardStats() {
  return apiClint("/admin/dashboard-stats", {
    method: "GET",
  });
}
