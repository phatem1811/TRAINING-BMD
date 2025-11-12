import { Router } from "express";
import { StaffController } from "../../controllers/staff/staffController";
import { validateJoi } from "../../middlewares/validateJoi";
import { createUser } from "../../validate/userValidation";
const router = Router();

router.post("/auth/login", StaffController.login);
router.post(
  "/createStaff",
  validateJoi(createUser),
  StaffController.createStaff
);
router.post("/auth/initAdmin", StaffController.initAdmin);

router.get("/getProfile", StaffController.getProfile);
router.get("/getAllStaff", StaffController.getAllStaff);
router.get("/getById/:id", StaffController.getById);

router.put("/updateProfile/:id", StaffController.updateProfile);
router.delete("/delete/:id", StaffController.delete);

router.put("/block/:id", StaffController.block);

router.post("/changePassword", StaffController.changePassword)

export default router;

/**
 * @swagger
 * /staff/auth/login:
 *   post:
 *     summary: Staff login
 *     tags:
 *       - Staff
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/auth/initAdmin:
 *   post:
 *     summary: initialize admin user
 *     tags:
 *       - Staff
 *     responses:
 *       201:
 *         description: Admin account created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
