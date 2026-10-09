import { updateUserRole } from "@/api";
import { UserRole } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserRole() {
  return useMutation({
    mutationFn: ({ id, role }: { id: string; role: UserRole }) =>
      updateUserRole(id, role),
  });
}
