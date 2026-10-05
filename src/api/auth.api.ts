import apiClint from "@/lib/apiClint";

export function userLogin(payload: { email: string, password: string }) {
    return apiClint("/auth/login", { method: "POST", body: payload })
}