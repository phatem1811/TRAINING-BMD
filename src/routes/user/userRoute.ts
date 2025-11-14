import { Router } from "express";
import { UserController } from "../../controllers/user/userController";
import { validateJoi } from "../../middlewares/validateJoi";
import { createUser } from "../../validate/userValidation";
const router = Router();

router.post("/auth/login", UserController.login)
router.post("/auth/signup",  validateJoi(createUser), UserController.signUp)

router.get("/getProfile", UserController.getProfile);
router.get("/getAll", UserController.getAllUsers);
router.get("/getById/:id", UserController.getById);

router.put("/updateProfile/:id", UserController.updateProfile);
router.delete("/delete/:id", UserController.delete);
router.put("/block/:id", UserController.block);

router.put("/changePassword", UserController.changePassword)

export default router;


/**
 * @swagger
 * /user/auth/login:
 *   post:
 *     summary: user login
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: 123456
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
 * /user/auth/signup:
 *   post:
 *     summary: Đăng ký tài khoản người dùng mới
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               password:
 *                 type: string
 *                 example: 123456
 *               fullName:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 example: a@example.com
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Tạo tài khoản thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: user1
 *                 fullName:
 *                   type: string
 *                   example: Nguyen Van A
 *                 email:
 *                   type: string
 *                   example: a@example.com
 *                 phone:
 *                   type: string
 *                   example: "0909123456"
 *       400:
 *         description: Username đã tồn tại hoặc dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Username is existed
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
