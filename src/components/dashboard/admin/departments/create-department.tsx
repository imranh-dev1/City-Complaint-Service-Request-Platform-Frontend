"use client";

import { Building2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CreateDepartmentForm from "@/components/form/create-department-form";

export default function CreateDepartment() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="mx-auto w-full max-w-4xl border-border shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Building2 className="size-5" />
            </div>

            <div className="space-y-1">
              <CardTitle className="text-xl">Create Department</CardTitle>

              <CardDescription>
                Add a new department to your organization.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <CreateDepartmentForm />
        </CardContent>
      </Card>
    </div>
  );
}
