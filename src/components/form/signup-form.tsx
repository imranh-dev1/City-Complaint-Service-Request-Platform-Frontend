"use client";

import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Apple, Eye, EyeOff, Loader2 } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { SignupFormValues, signupSchema } from "@/validation";
import Image from "next/image";
import signupImage from "@/assests/authentication/login.jpg";
import { BsGoogle, BsMeta } from "react-icons/bs";
import { useRegister } from "@/hooks";
import { IUserRegisterPayload } from "@/types";
import { useRouter } from "next/navigation";
import { GoogleLoginComponet } from "../module/google-login/googleLogin";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: register, isPending } = useRegister();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),

    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    const { confirmPassword, ...userData } = values;

    // Data that will go to backend
    const payload: IUserRegisterPayload = {
      ...userData,
    };

    register(payload, {
      onSuccess: (res) => {
        toast.success("Account created successfully!");

        form.reset();
        router.push(`/signup/register-email-verify?email=${payload.email}`);
      },
      onError: () => {
        toast.error("Registration failed");
      },
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="flex gap-0 md:gap-6 flex-col md:flex-row">
        {/* Header */}

        <div className="flex-1 p-4">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">Create Account</h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your account to get started
            </p>
          </div>

          {/* Form */}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}

            <div className="space-y-2">
              <FieldLabel htmlFor="name">Name</FieldLabel>

              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                {...form.register("name")}
                disabled={form.formState.isSubmitting}
              />

              {form.formState.errors.name && (
                <FieldError>{form.formState.errors.name.message}</FieldError>
              )}
            </div>

            {/* Email */}

            <div className="space-y-2">
              <FieldLabel htmlFor="email">Email</FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
                disabled={form.formState.isSubmitting}
              />

              {form.formState.errors.email && (
                <FieldError>{form.formState.errors.email.message}</FieldError>
              )}
            </div>

            {/* Phone */}

            <div className="space-y-2">
              <FieldLabel htmlFor="phone">Phone</FieldLabel>

              <Input
                id="phone"
                type="tel"
                placeholder="+8801XXXXXXXXX"
                {...form.register("phone")}
                disabled={form.formState.isSubmitting}
              />

              {form.formState.errors.phone && (
                <FieldError>{form.formState.errors.phone.message}</FieldError>
              )}
            </div>

            {/* Password */}

            <div className="space-y-2">
              <FieldLabel htmlFor="password">Password</FieldLabel>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="pr-10"
                  {...form.register("password")}
                  disabled={form.formState.isSubmitting}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {form.formState.errors.password && (
                <FieldError>
                  {form.formState.errors.password.message}
                </FieldError>
              )}
            </div>

            {/* Confirm Password */}

            <div className="space-y-2">
              <FieldLabel htmlFor="confirmPassword">
                Confirm Password
              </FieldLabel>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  className="pr-10"
                  {...form.register("confirmPassword")}
                  disabled={form.formState.isSubmitting}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {form.formState.errors.confirmPassword && (
                <FieldError>
                  {form.formState.errors.confirmPassword.message}
                </FieldError>
              )}
            </div>

            {/* Submit */}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting || isPending}
            >
              {form.formState.isSubmitting || isPending
                ? "Creating account..."
                : "Create Account"}
            </Button>

            {/* Social Login */}
            <GoogleLoginComponet />

            {/* Login */}

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={signupImage}
            alt="Login"
            fill
            priority
            sizes="50vw"
            className="object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </CardContent>
    </Card>
  );
}
