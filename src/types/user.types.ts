import { AuthProvider, UserRole, UserStatus } from "./auth.types";

export interface ICitizen {
  id: string;
  userId: string;
  nid: string | null;
  address: string | null;
  wardNo: string | null;
  area: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  googleId: string | null;
  authProvider: AuthProvider;
  emailVerified: boolean;
  role: UserRole;
  status: UserStatus;
  needPasswordChange: boolean;
  imageUrl: string;
  imagePublicId: string;
  phone: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
  departmentId: string | null;
  createdAt: string;
  updatedAt: string;
  citizen: ICitizen | null;
}
