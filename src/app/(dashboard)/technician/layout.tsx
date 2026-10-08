import RoleGuard from "@/components/auth/role-gurd";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function TechnicianLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["TECHNICIAN"]}>
      <DashboardShell role="TECHNICIAN">{children}</DashboardShell>
    </RoleGuard>
  );
}
