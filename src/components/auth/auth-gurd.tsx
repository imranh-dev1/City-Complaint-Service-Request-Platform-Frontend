"use client"

import { useGetMe } from "@/hooks";
import { ReactNode, useEffect } from "react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import AuthLoading from "./auth-loading";

export default function AuthGurd({ children }: { children: ReactNode }) {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();

  const user = data?.data

  useEffect(() => {
    if (isPending) return;

    if (isError || !user) {
      router.replace("/login")
      return
    }

  }, [router, user, isError, isPending]);

  return isPending ? <AuthLoading /> : <>{children}</>
}