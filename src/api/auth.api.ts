import apiClint from "@/lib/apiClint";
import { IUserRegisterPayload } from "@/types/auth.types";

export function userRegister(payload: IUserRegisterPayload) {
  return apiClint("/auth/register", { method: "POST", body: payload });
}

export function userLogin(payload: { email: string; password: string }) {
  return apiClint("/auth/login", { method: "POST", body: payload });
}
