import { UserRole, UserStatus } from "./auth.types";

export type RoleStat = {
  _count: number;
  role: UserRole;
};

export type ComplaintStatus = {
  status: string;
  _count: number;
};

export type RecentComplaint = {
  id: string;
  title?: string;
  status?: string;
  createdAt?: string;
};

export type DashboardData = {
  users: {
    total: number;
    byRole: RoleStat[];
  };

  complaints: {
    total: number;
    byStatus: ComplaintStatus[];
    recent: RecentComplaint[];
    sla: {
      breached: number;
      approaching: number;
    };
  };

  payments: {
    total: number;
    paid: number;
    totalRevenue: string;
  };

  resources: {
    departments: number;
    categories: number;
  };

  feedback: {
    averageRating: number;
    total: number;
  };

  topCategories: {
    id: string;
    name: string;
    departmentId: string;
    _count: {
      complaints: number;
    };
  }[];
};

export interface AdminParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  role?: string;
  status?: string;
}

export type UserItem = {
  id: string;
  name: string;
  email: string;
  authProvider: "GOOGLE" | "CREDENTIAL";
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  imageUrl: string;
  phone: string | null;
  createdAt: string;
  department?: {
    id: string;
    name: string;
  } | null;

  _count: {
    complaints: number;
    payments: number;
  };
};

export type UsersResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: UserItem[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type SelectedUser = {
  id: string;
  name: string;
  email: string;
  status: UserStatus;
};

export type RoleChangeSelectedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export interface IAuditLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown> | null;
  createdAt: string;
  user?: {
    id?: string;
    name: string;
    email: string;
    role: string;
  } | null;
}
