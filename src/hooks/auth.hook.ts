import { getMe, googleAuthLogin, userLogin, userLogout, userRegister, userVerifyAccount } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: userVerifyAccount,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useGoogleAuthLogin() {
  return useMutation({
    mutationFn: googleAuthLogin
  })
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  })
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogout
  });
}