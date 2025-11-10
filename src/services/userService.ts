import { AppDataSource } from "../config/connection";
import { User, UserRole } from "../entities/user";

import { IUser } from "../interface/user";
import { BadRequest } from "../utils/helper/badRequest";
import { hashPassword } from "../utils/helper/hassPass";
const userRepository = AppDataSource.getRepository(User);
export const UserService = {
  getProfile: async (userId: number) => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequest("User not Found", 400);
    const { password, ...rest } = user;
    return rest;
  },

  getAllUsers: async (limit: number, page: number) => {
    const skip = (page - 1) * limit;
    const [users, total] = await userRepository.findAndCount({
      where: { role: UserRole.CLIENT },
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    });
    const items = users.map(({ password, ...rest }) => rest);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  getAllAdmins: async (limit: number, page: number) => {
    const skip = (page - 1) * limit;
    const [users, total] = await userRepository.findAndCount({
      where: { role: UserRole.ADMIN },
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    });
    const items = users.map(({ password, ...rest }) => rest);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  signUp: async (reqBody: IUser) => {
    const { username, password, email, phone, fullName, role } = reqBody;
    const existingUser = await userRepository.findOneBy({ username });
    if (existingUser) {
      throw new BadRequest("Username is existed", 400);
    }
    const hashedPassword = await hashPassword(password);

    const user = userRepository.create({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      phone: phone,
      email: email,
      role: role || UserRole.CLIENT,
    });

    return user;
  },
  updateProfile: async (userId: number, reqBody: IUser) => {
    const { email, phone, fullName } = reqBody;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequest("User not Found", 400);
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (fullName !== undefined) user.fullName = fullName;
    const updatedUser = await userRepository.save(user);

    const { password, ...rest } = updatedUser;
    return rest;
  },
  delete: async (userId: number) => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequest("User not found", 404);

    await userRepository.remove(user);

    return null;
  },
};
