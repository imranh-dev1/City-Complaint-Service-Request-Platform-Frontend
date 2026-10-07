import { ReactNode } from "react";

export default function CitizenLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      Citizen Dashboard
      {children}
    </>
  );
}