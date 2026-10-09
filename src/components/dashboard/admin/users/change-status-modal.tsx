"use client";

import { useEffect, useState } from "react";
import { Loader2, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { UserStatus } from "@/types";
import { useUpdateUserStatus } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";

type ChangeStatusModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
  } | null;
};

export default function ChangeStatusModal({
  open,
  onOpenChange,
  user,
}: ChangeStatusModalProps) {
  const [status, setStatus] = useState<UserStatus>("ACTIVE");
  const queryClient = useQueryClient();
  const { mutate: updateStatus, isPending } = useUpdateUserStatus();


  console.log(user);


  useEffect(() => {
    if (user) {
      setStatus(user.status);
    }
  }, [user]);

  const handleSubmit = () => {
    if (!user || status === user.status) {
      return;
    }

    updateStatus(
      {
        id: user.id,
        status,
      },
      {
        onSuccess: () => {
          toast.success("User status updated successfully.");
          queryClient.invalidateQueries({
            queryKey: ["dashboard-users"],
          })
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update user status.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-11 items-center justify-center rounded-xl bg-primary/10">
            <ShieldCheck className="size-5 text-primary" />
          </div>

          <DialogTitle>Change User Status</DialogTitle>

          <DialogDescription>
            Update the account status for this user.
          </DialogDescription>
        </DialogHeader>

        {user && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <UserRound className="size-5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Account Status</label>

              <Select
                value={status}
                onValueChange={(value) => setStatus(value as UserStatus)}
                disabled={isPending}
              >
                <SelectTrigger className="w-full focus:ring-primary/20">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                  <SelectItem value="DELETED">Deleted</SelectItem>
                </SelectContent>
              </Select>

              <p className="text-xs text-muted-foreground">
                Choose the status you want to assign to this account.
              </p>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending || !user || status === user.status}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 size-4" />
                Update Status
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
