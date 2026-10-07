import RoleGuard from "@/components/auth/role-gurd";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RoleGuard allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
      {children}
    </RoleGuard>
  );
}