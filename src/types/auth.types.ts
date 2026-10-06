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
  authProvider?: "GOOGLE" | "CREDENTIAL";
  emailVerified?: boolean;
  role?: "CITIZEN" | "ADMIN";
  status?: "ACTIVE" | "INACTIVE" | "BANNED";
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
