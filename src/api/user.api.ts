import apiClint from "@/lib/apiClint";

export function getMe() {
  return apiClint("/auth/me", { method: "GET" });
}
