import { IDepartment } from "./department.types";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  slaHours: number;
  departmentId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  department: IDepartment;
  _count: {
    complaints: number;
  };
}

export interface ICreateCategory {
  name: string;
  description?: string;
  slaHours?: number;
  departmentId: string;
}
