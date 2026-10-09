"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import type { UserRole } from "@/types";
import { useUpdateUserRole } from "@/hooks/super.admin.hook";
import { useQueryClient } from "@tanstack/react-query";

type ChangeRoleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  } | null;
};

const roleOptions: { label: string; value: UserRole }[] = [
  { label: "Citizen", value: "CITIZEN" },
  { label: "Technician", value: "TECHNICIAN" },
  { label: "Admin", value: "ADMIN" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
];

export default function ChangeRoleModal({
  open,
  onOpenChange,
  user,
}: ChangeRoleModalProps) {
  const [role, setRole] = useState<UserRole>("CITIZEN");
  const queryClient = useQueryClient();

  const { mutate: updateRole, isPending } = useUpdateUserRole();

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user || role === user.role) return;

    updateRole(
      { id: user.id, role },
      {
        onSuccess: () => {
          toast.success("User role updated successfully.");
          queryClient.invalidateQueries({
            queryKey: ["dashboard-users"],
          });
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to update user role.",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {" "}
      <DialogContent className="sm:max-w-md">
        {" "}
        <DialogHeader>
          {" "}
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {" "}
            <ShieldCheck className="size-5" />{" "}
          </div>
          <DialogTitle> Change User Role</DialogTitle>
          <DialogDescription>
            Update this user&apos;s role and access permissions.
          </DialogDescription>
        </DialogHeader>
        {user && (
          <div className="space-y-5 py-2">
            <div className="flex items-center gap-3 rounded-xl border p-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">User Role</label>

              <Select
                value={role}
                onValueChange={(value) => setRole(value as UserRole)}
                disabled={isPending}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>

                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-xs text-muted-foreground">
              Changing a role may change the user&apos;s permissions.
            </p>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!user || isPending || role === user.role}
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
