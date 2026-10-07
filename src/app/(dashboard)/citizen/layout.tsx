import RoleGuard from "@/components/auth/role-gurd";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { ReactNode } from "react";

export default function CitizenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["CITIZEN"]}>
      <DashboardShell role="CITIZEN">
        {children}
      </DashboardShell>
    </RoleGuard>
  );
}