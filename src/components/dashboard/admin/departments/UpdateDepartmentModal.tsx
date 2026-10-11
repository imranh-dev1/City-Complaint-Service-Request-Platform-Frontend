import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateDepartmentForm from "@/components/form/update-department-form";

interface UpdateDepartmentDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  departmentId: string;
}

export default function UpdateDepartmentModal({
  open,
  onOpenChange,
  departmentId,
}: UpdateDepartmentDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Department</DialogTitle>
          <DialogDescription>Update the Department details.</DialogDescription>
        </DialogHeader>

        <UpdateDepartmentForm
          departmentId={departmentId}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
