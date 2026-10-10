import AuthLoading from "@/components/auth/auth-loading";
import RegisterEmailVerify from "@/components/auth/register-email-verify/register-email-verify";
import { Suspense } from "react";

export default function RegisterEmailVerifyPage() {
  return (
    <Suspense fallback={<AuthLoading />}>
      <RegisterEmailVerify />
    </Suspense>
  );
}
