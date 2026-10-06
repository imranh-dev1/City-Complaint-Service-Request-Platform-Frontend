export type AuthProvider =
  | "CREDENTIAL"
  | "GOOGLE";

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "CITIZEN";

export type UserStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BANNED";



export interface ICitizenProfile {
  nid?: string;
  address?: string;
  wardNo?: string;
  area?: string;
}

export interface IUserRegisterPayload {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  authProvider?: AuthProvider;
  emailVerified?: boolean;
  role?: UserRole;
  status?: UserStatus;
  needPasswordChange?: boolean;
  imageUrl?: string;
  imagePublicId?: string;
  phone?: string | null;
  isDeleted?: boolean;
  deletedAt?: Date | null;

  citizen?: ICitizenProfile;
}

export interface IVerifyAccountPayload {
  email: string;
  otp: string;
}

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