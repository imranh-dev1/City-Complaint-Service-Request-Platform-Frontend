import RoleGuard from "@/components/auth/role-gurd";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
      <DashboardShell role="SUPER_ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
}
