import { userLogin, userRegister } from "@/api";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}
