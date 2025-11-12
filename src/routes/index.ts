import { Router } from "express";
import StaffRoute from "./staff/staffRoute";
import ProductStaffRoute from "./staff/productRoute";
import CategoryStaffRoute from "./staff/categoryRoute";

import UserRoute from "./user/userRoute";
import CategoryUserRoute from "./user/categoryRoute";
import ProducUserRoute from "./user/productRoute";

import UploadRoute from "./uploadRoute";
const router = Router();

router.use("/staff", StaffRoute);
router.use("/staff/product", ProductStaffRoute);
router.use("/staff/category", CategoryStaffRoute);

router.use("/user", UserRoute);
router.use("/user/category", CategoryUserRoute);
router.use("/user/product", ProducUserRoute);

router.use("/upload", UploadRoute);
export default router;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */