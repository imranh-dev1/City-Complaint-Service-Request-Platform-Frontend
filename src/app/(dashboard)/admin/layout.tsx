import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      Admin Dashboard
      {children}
    </>
  );
}