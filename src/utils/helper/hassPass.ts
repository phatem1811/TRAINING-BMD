// src/utils/hash.ts
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10; // số vòng salt, càng cao càng bảo mật nhưng chậm hơn

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}
