export type AuthProvider = "CREDENTIAL" | "GOOGLE";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "TECHNICIAN" | "CITIZEN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

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
