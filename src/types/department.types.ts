export type DepartmentManager = {
  id: string;
  name: string;
  email: string;
};

export type Department = {
  id: string;
  name: string;
  code: string;
  description: string;
  isActive: boolean;
  managerId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  manager: DepartmentManager | null;
  _count: {
    staff: number;
    categories: number;
    complaints: number;
  };
};

export type DepartmentResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Department[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type DepartmentQueryParams = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isActive?: boolean;
  search?: string;
};
