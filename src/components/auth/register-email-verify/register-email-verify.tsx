"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useVerifyAccount } from "@/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function RegisterEmailVerify() {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const { mutate: verifyAccount, isPending } = useVerifyAccount();

  const email = params.get("email");

  if (!email) {
    toast.error(
      "Please register your account first and verify your email address",
    );
    router.push("/signup");
  }

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }

    const payload = {
      email: email || "",
      otp,
    };

    verifyAccount(payload, {
      onSuccess: () => {
        toast.success("Email verified successfully!");
        router.push("/login");
      },
      onError: (error) => {
        console.error("Email verification error:", error);

        toast.error("Email verification failed");
      },
    });
  };

  const handleResend = async () => {
    try {
      setIsResending(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Verification code sent again!");
    } catch (error) {
      console.error("Resend error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend verification code",
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="size-6" />
          </div>

          <CardTitle className="text-2xl">Verify your email</CardTitle>

          <CardDescription className="mx-auto max-w-sm">
            We&apos;ve sent a 6-digit verification code to your email address.
            Enter the code below to verify your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Email */}
            <Field className="space-y-2">
              <FieldLabel htmlFor="email">Email address</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder={email || "name@example.com"}
                readOnly
                className="bg-muted/40"
              />

              <FieldDescription>
                We&apos;ve sent a 6-digit verification code to this email
                address.
              </FieldDescription>
            </Field>

            {/* OTP */}
            <div className="space-y-3">
              <div className="flex justify-center pt-1">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  disabled={isPending}
                  inputMode="numeric"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>

            {/* Verify */}
            <Button
              type="button"
              className="w-full"
              disabled={otp.length !== 6 || isPending}
              onClick={handleVerify}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>

            {/* Resend */}
            <div className="rounded-lg border bg-muted/30 p-3 text-center">
              <p className="text-sm text-muted-foreground">
                Didn&apos;t receive the code?
              </p>

              <Button
                type="button"
                variant="link"
                className="h-auto px-1 pt-1 font-medium text-primary"
                disabled={isResending || isPending}
                onClick={handleResend}
              >
                {isResending ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Resend verification code"
                )}
              </Button>
            </div>

            {/* Back */}
            <div className="border-t pt-5 text-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" />
                Back to signup
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
