import 'dotenv/config';
export const envConfig = {
    PORT: process.env.PORT || 3000,
    BASE_URL: process.env.BASE_URL || "/api",

    DB_TYPE: process.env.DB_TYPE || "mysql",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || "root",
    DB_PASS: process.env.DB_PASS || "",
    DB_NAME: process.env.DB_NAME || "bmd-training",

    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};
