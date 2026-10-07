import AuthGurd from "@/components/auth/auth-gurd";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGurd>
      {children}
    </AuthGurd>
  );
}