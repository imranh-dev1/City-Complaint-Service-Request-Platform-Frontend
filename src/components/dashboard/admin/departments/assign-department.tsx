"use client";

import { Building2, GitBranch } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AssignDepartmentForm from "@/components/form/assign-department-form";

export default function AssignDepartment() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-2xl border-border shadow-sm">
        <CardHeader className="space-y-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <GitBranch className="size-6" />
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Assign Department
            </CardTitle>

            <CardDescription className="leading-6">
              <Building2 className="mr-1 inline size-4" />
              Assign a staff member or technician to the appropriate city
              service department.
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <AssignDepartmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
