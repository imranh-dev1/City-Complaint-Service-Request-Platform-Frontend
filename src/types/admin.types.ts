import { UserRole } from "./auth.types";

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
