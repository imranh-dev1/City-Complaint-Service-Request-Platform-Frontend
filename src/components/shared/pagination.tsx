"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type DataPaginationProps = {
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (page: number) => void;
};

export default function DataPagination({
  page,
  totalPages,
  isLoading = false,
  onPageChange,
}: DataPaginationProps) {
  if (totalPages <= 0) return null;

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {" "}
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages} </span>{" "}
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1 || isLoading}
          onClick={() => onPageChange(page - 1)}
          className="hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="mr-1 size-4" />
          Previous
        </Button>

        <Button
          size="sm"
          disabled
          className="min-w-9 bg-primary text-primary-foreground opacity-100 hover:bg-primary/90"
        >
          {page}
        </Button>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages || isLoading}
          onClick={() => onPageChange(page + 1)}
          className="hover:border-primary hover:text-primary"
        >
          Next
          <ChevronRight className="ml-1 size-4" />
        </Button>
      </div>
    </div>
  );
}
