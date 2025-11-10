import { UserRole } from "../entities/user";

export interface IUser {
  id: number;
  username: string;
  password: string;
  fullName?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
