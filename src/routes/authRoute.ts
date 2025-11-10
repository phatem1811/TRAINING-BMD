import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { UserController } from "../controllers/userController";
const router = Router();

router.post("/initAdmin", AuthController.initAdmin);
router.post("/login", AuthController.login);

export default router;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags:
 *       - Auth
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
 * /auth/initAdmin:
 *   post:
 *     summary: initialize admin user
 *     tags:
 *       - Auth
 *     responses:
 *       201:
 *         description: Admin account created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
