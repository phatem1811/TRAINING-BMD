import { AppDataSource } from "../../config/connection";
import { Staff } from "../../entities/staff";
import { IUser } from "../../interface/user";
import { BadRequest } from "../../utils/helper/badRequest";
import { comparePassword, hashPassword } from "../../utils/helper/hassPass";
import { generateToken } from "../../utils/helper/jwt";
const staffRepository = AppDataSource.getRepository(Staff);
export const StaffService = {
  initAdmin: async () => {
    try {
      const existingAdmin = await staffRepository.findOneBy({
        username: "admin",
      });

      if (existingAdmin) {
        throw new BadRequest("Admin already exists", 400);
      }
      const admin = staffRepository.create({
        username: "admin",
        password: await hashPassword("admin123"),
        fullName: "Super Admin",
      });
      return staffRepository.save(admin);
    } catch (error) {
      throw error;
    }
  },
  getProfile: async (staffId: number) => {
    const staff = await staffRepository.findOneBy({ id: staffId });
    if (!staff) throw new BadRequest("staff not Found", 400);
    const { password, ...rest } = staff;
    return rest;
  },

  getAllStaff: async (
    limit: number,
    page: number,
    search?: string,
    isActive: boolean = true
  ) => {
    const skip = (page - 1) * limit;
    const query = staffRepository.createQueryBuilder("staff");
    query.where("staff.isActive = :isActive", { isActive });
    if (search) {
      query.andWhere(
        "(staff.fullName LIKE :search OR staff.username LIKE :search OR staff.email LIKE :search OR staff.phone LIKE :search)",
        { search: `%${search}%` }
      );
    }
    query.skip(skip).take(limit).orderBy("staff.createdAt", "DESC");

    const [staffs, total] = await query.getManyAndCount();

    const items = staffs.map(({ password, ...rest }) => rest);

    return {
      data:items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  createStaff: async (reqBody: IUser) => {
    const { username, password, email, phone, fullName } = reqBody;
    const existingstaff = await staffRepository.findOneBy({ username });
    if (existingstaff) {
      throw new BadRequest("username is existed", 400);
    }
    const hashedPassword = await hashPassword(password);

    const staff = staffRepository.create({
      username: username,
      password: hashedPassword,
      fullName: fullName,
      phone: phone,
      email: email,
    });
    await staffRepository.save(staff);
    return staff;
  },
  updateProfile: async (staffId: number, reqBody: IUser) => {
    const { email, phone, fullName, avatar } = reqBody;
    const staff = await staffRepository.findOneBy({ id: staffId });
    if (!staff) throw new BadRequest("Staff not Found", 400);
    if (email !== undefined) staff.email = email;
    if (phone !== undefined) staff.phone = phone;
    if (fullName !== undefined) staff.fullName = fullName;
    if (avatar !== undefined) staff.avatar = avatar;
    const updatedstaff = await staffRepository.save(staff);

    const { password, ...rest } = updatedstaff;
    return rest;
  },
  delete: async (staffId: number) => {
    const staff = await staffRepository.findOneBy({ id: staffId });
    if (!staff) throw new BadRequest("Staff not found", 404);

    await staffRepository.remove(staff);

    return null;
  },
  login: async (username: string, password: string) => {
    try {
      const staff = await staffRepository.findOneBy({ username });
      if (!staff) {
        throw new BadRequest("User or Password is incorrect", 400);
      }
      const isMatch = await comparePassword(password, staff.password);
      if (!isMatch) {
        throw new BadRequest("User or Password is incorrect", 400);
      }
      if (staff.isActive === false)
        throw new BadRequest("Account has been blocked", 400);
      const payload = { id: staff.id, type: "admin" }; // truyen type cho token, them ngay cap token
      const token = generateToken(payload);
      return { token };
    } catch (error) {
      throw error;
    }
  },
  block: async (id: number) => {
    const staff = await staffRepository.findOneBy({ id });
    if (!staff) throw new BadRequest("staff not found", 404);

    staff.isActive = false;
    return await staffRepository.save(staff);
  },
  unblock: async (id: number) => {
    const staff = await staffRepository.findOneBy({ id });
    if (!staff) throw new BadRequest("staff not found", 404);

    staff.isActive = true;
    return await staffRepository.save(staff);
  },
  changePassword: async (
    username: string,
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    currentUser: number
  ) => {
    const user = await staffRepository.findOneBy({ username });
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
    await staffRepository.save(user);
    return null;
  },
};
