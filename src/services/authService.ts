import { AppDataSource } from "../config/connection";
import { User, UserRole } from "../entities/user";
import { comparePassword, hashPassword } from "../utils/helper/hassPass";
import { BadRequest } from "../utils/helper/badRequest";
import  { generateToken } from "../utils/helper/jwt";
const userRepo = AppDataSource.getRepository(User);
export const AuthService = {
  initAdmin: async () => {
    try {
      const existingAdmin = await userRepo.findOneBy({ username: "admin" });

      if (existingAdmin) {
        throw new BadRequest("Admin already exists", 400);
      }
      const admin = userRepo.create({
        username: "admin1",
        password: await hashPassword("admin123"),
        fullName: "Super Admin",
        role: UserRole.ADMIN,
      });
      return userRepo.save(admin);
    } catch (error) {
      throw error;
    }
  },
  login: async (username: string, password: string) => {
    try {
      const user = await userRepo.findOneBy({ username });
      if (!user) {
        throw new BadRequest("User or Password is incorrect", 400);
      }
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        throw new BadRequest("User or Password is incorrect", 400);
      }
      const payload = { id: user.id, role: user.role };
      const token = generateToken(payload);
      return {token};
    } catch (error) {
      throw error;
    }
  }
};
