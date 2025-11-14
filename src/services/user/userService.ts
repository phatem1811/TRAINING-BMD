import { AppDataSource } from "../../config/connection";
import { User } from "../../entities/user";

import { IUser } from "../../interface/user";
import { BadRequest } from "../../utils/helper/badRequest";
import { comparePassword, hashPassword } from "../../utils/helper/hassPass";
import { generateToken } from "../../utils/helper/jwt";
const userRepository = AppDataSource.getRepository(User);
export const UserService = {
  getProfile: async (userId: number) => {
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
  signUp: async (reqBody: IUser) => {
    const { username, password, email, phone, fullName } = reqBody;
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
    });
    await userRepository.save(user);
    return user;
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
  login: async (username: string, password: string) => {
    try {
      const user = await userRepository.findOneBy({ username });
      if (!user) {
        throw new BadRequest("User or Password is incorrect", 400);
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new BadRequest("User or Password is incorrect", 400);
      }
      if (user.isActive === false)
        throw new BadRequest("Account has been blocked", 400);
      const payload = { id: user.id, type: "client" };
      const token = generateToken(payload);
      return { token };
    } catch (error) {
      throw error;
    }
  },
  block: async (id: number) => {
    const user = await userRepository.findOneBy({ id });
    if (!user) throw new BadRequest("staff not found", 404);

    user.isActive = false;
    return await userRepository.save(user);
  },
  changePassword: async (
    username: string,
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    currentUser: number
  ) => {
    const user = await userRepository.findOneBy({ username });
    if (!user) throw new BadRequest("User or Password is incorrect", 400);
    const checkPass = await comparePassword(password, user.password);
    if (!checkPass) {
      throw new BadRequest("User or Password is incorrect", 400);
    }
    if (currentUser !== user.id) {
      throw new BadRequest("You are not allowed to change this password", 403);
    }
    if (newPassword !== confirmNewPassword) {
      throw new BadRequest(
        "New password and confirm password do not match",
        400
      );
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await userRepository.save(user);
    return null;
  },
};
