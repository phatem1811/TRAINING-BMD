export interface IUser {
  id: number;
  username: string;
  password: string;
  fullName?: string;
  avatar?: string;
  phone?: string;
  email?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
