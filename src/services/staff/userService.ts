import { AppDataSource } from "../../config/connection";
import { User } from "../../entities/user";

import { IUser } from "../../interface/user";
import { BadRequest } from "../../utils/helper/badRequest";
import { comparePassword, hashPassword } from "../../utils/helper/hassPass";
import { generateToken } from "../../utils/helper/jwt";
const userRepository = AppDataSource.getRepository(User);
export const UserService = {
  getById: async (userId: number) => {
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequest("User not Found", 400);
    const { password, ...rest } = user;
    return rest;
  },

  getAllUsers: async (
    limit: number,
    page: number,
    search: string,
    isActive: boolean = true
  ) => {
    const skip = (page - 1) * limit;
    const query = userRepository.createQueryBuilder("user");
    query.where("user.isActive = :isActive", { isActive });
    if (search) {
      query.where(
        "user.fullName LIKE :search OR user.username LIKE :search OR user.email LIKE :search OR user.phone LIKE :search",
        { search: `%${search}%` }
      );
    }
    query.skip(skip).take(limit).orderBy("user.createdAt", "DESC");
    const [users, total] = await query.getManyAndCount();

    const items = users.map(({ password, ...rest }) => rest);
    return {
      data: items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  updateProfile: async (userId: number, reqBody: IUser) => {
    const { email, phone, fullName, avatar } = reqBody;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequest("User not Found", 400);
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (fullName !== undefined) user.fullName = fullName;
    if (avatar !== undefined) user.avatar = avatar;
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

  block: async (id: number) => {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new BadRequest("staff not found", 404);

    user.isActive = false;
    return await userRepository.save(user);
  },
  unblock: async (id: number) => {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new BadRequest("staff not found", 404);

    user.isActive = true;
    return await userRepository.save(user);
  },
};
