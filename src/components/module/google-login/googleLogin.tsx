"use client";

import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Field } from "@/components/ui/field";
import { useGoogleAuthLogin } from "@/hooks";

export function GoogleLoginComponet() {
  const router = useRouter();

  const { mutate: googleOAuthLogin } = useGoogleAuthLogin();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.error("Google Token login failed");
      return;
    }

    googleOAuthLogin(
      { idToken },
      {
        onSuccess: (res) => {
          console.log(res);

          toast.success(res.message || "Login successful");
          router.push("/");
        },

        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.error("Google token login failed. Please try again.");
  };

  return (
    <Field className="grid gap-4 border border-primary rounded-full ">
      <GoogleLogin
        theme="filled_black"
        size="medium"
        text="continue_with"
        shape="pill"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </Field>
  );
}
