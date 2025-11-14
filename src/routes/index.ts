import { Router } from "express";
import StaffRoute from "./staff/staffRoute";
import ProductStaffRoute from "./staff/productRoute";
import CategoryStaffRoute from "./staff/categoryRoute";
import DashboardRoute from "./staff/dashBoardRoute";
import OrderStaffRoute from "./staff/orderRoute";

import UserRoute from "./user/userRoute";
import CategoryUserRoute from "./user/categoryRoute";
import ProducUserRoute from "./user/productRoute";
import OrderUserRoute from "./user/orderRoute";

import UploadRoute from "./uploadRoute";
const router = Router();

router.use("/staff", StaffRoute);
router.use("/staff/product", ProductStaffRoute);
router.use("/staff/category", CategoryStaffRoute);
router.use("/staff/order", OrderStaffRoute);
router.use("/staff/dashboard", DashboardRoute);

router.use("/user", UserRoute);
router.use("/user/category", CategoryUserRoute);
router.use("/user/product", ProducUserRoute);
router.use("/user/order", OrderUserRoute);

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