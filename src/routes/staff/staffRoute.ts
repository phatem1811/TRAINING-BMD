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
router.post("/create", validateJoi(createUser), StaffController.createStaff);

router.get("/getProfile", StaffController.getProfile);
router.get("/getAll", StaffController.getAllStaff);
router.get("/getById/:id", StaffController.getById);

router.put("/updateProfile/:id", StaffController.updateProfile);
router.delete("/delete/:id", StaffController.delete);

router.put("/block/:id", StaffController.block);
router.put("/unblock/:id", StaffController.unblock);

router.put("/changePassword", StaffController.changePassword)

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
/**
 * @swagger
 * /staff/create:
 *   post:
 *     summary: Tạo mới nhân viên
 *     description: API tạo mới một nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "staff01"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               fullName:
 *                 type: string
 *                 example: "Nguyễn Văn A"
 *               phone:
 *                 type: string
 *                 example: "0909123456"
 *               email:
 *                 type: string
 *                 example: "vana@example.com"
 *     responses:
 *       201:
 *         description: Tạo nhân viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "staff01"
 *                 fullName:
 *                   type: string
 *                   example: "Nguyễn Văn A"
 *                 phone:
 *                   type: string
 *                   example: "0909123456"
 *                 email:
 *                   type: string
 *                   example: "vana@example.com"
 *       400:
 *         description: Username đã tồn tại hoặc dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi hệ thống
 */

/**
 * @swagger
 * /staff/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại 
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng nhân viên mỗi trang
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm theo fullName, username, email hoặc phone
 *         example: "nguyen"
 *       - name: isActive
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           default: true
 *         description: 
 *           Lọc theo trạng thái hoạt động. 
 *           Nếu không truyền, mặc định là `true`
 *     responses:
 *       200:
 *         description: Lấy danh sách nhân viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: admin
 *                       fullName:
 *                         type: string
 *                         example: Nguyễn Văn A
 *                       email:
 *                         type: string
 *                         example: nguyenvana@example.com
 *                       phone:
 *                         type: string
 *                         example: "0909123456"
 *                       avatar:
 *                         type: string
 *                         example: https://example.com/avatar.jpg
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-13T08:15:00.000Z
 *                 total:
 *                   type: integer
 *                   example: 45
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Query param không hợp lệ
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Lấy danh sách tất cả khách hàng
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []  
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Trang hiện tại 
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Số lượng nhân viên mỗi trang
 *       - name: search
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Từ khóa tìm kiếm theo fullName, username, email hoặc phone
 *         example: "nguyen"
 *       - name: isActive
 *         in: query
 *         required: false
 *         schema:
 *           type: boolean
 *           default: true
 *         description: 
 *           Lọc theo trạng thái hoạt động. 
 *           Nếu không truyền, mặc định là `true`
 *     responses:
 *       200:
 *         description: Lấy danh sách nhân viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: admin
 *                       fullName:
 *                         type: string
 *                         example: Nguyễn Văn A
 *                       email:
 *                         type: string
 *                         example: nguyenvana@example.com
 *                       phone:
 *                         type: string
 *                         example: "0909123456"
 *                       avatar:
 *                         type: string
 *                         example: https://example.com/avatar.jpg
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-11-13T08:15:00.000Z
 *                 total:
 *                   type: integer
 *                   example: 45
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Query param không hợp lệ
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /staff/getProfile:
 *   get:
 *     summary: Lấy thông tin hồ sơ của nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin nhân viên thành công
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
 *                   example: admin
 *                 avatar:
 *                   type: string
 *                   example: https://example.com/avatar.jpg
 *                 fullName:
 *                   type: string
 *                   example: Nguyễn Văn A
 *                 phone:
 *                   type: string
 *                   example: "0909123456"
 *                 email:
 *                   type: string
 *                   example: nguyenvana@example.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Không tìm thấy nhân viên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: staff not Found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /staff/getById/{id}:
 *   get:
 *     summary: Lấy thông tin hồ sơ của nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của nhân viên cần lấy thông tin
 *         example: 1
 *     responses:
 *       200:
 *         description: Lấy thông tin nhân viên thành công
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
 *                   example: admin
 *                 avatar:
 *                   type: string
 *                   example: https://example.com/avatar.jpg
 *                 fullName:
 *                   type: string
 *                   example: Nguyễn Văn A
 *                 phone:
 *                   type: string
 *                   example: "0909123456"
 *                 email:
 *                   type: string
 *                   example: nguyenvana@example.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Không tìm thấy nhân viên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: staff not Found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /staff/updateProfile/{id}:
 *   put:
 *     summary: Cập nhật thông tin hồ sơ của nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: [] # Yêu cầu xác thực bằng JWT token
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của nhân viên cần cập nhật
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: Nguyễn Văn A
 *               phone:
 *                 type: string
 *                 example: "0909123456"
 *               email:
 *                 type: string
 *                 example: nguyenvana@example.com
 *               avatar:
 *                 type: string
 *                 example: https://example.com/avatar.jpg
 *             description: Các trường cần cập nhật cho nhân viên
 *     responses:
 *       200:
 *         description: Cập nhật thông tin nhân viên thành công
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
 *                   example: admin
 *                 avatar:
 *                   type: string
 *                   example: https://example.com/avatar.jpg
 *                 fullName:
 *                   type: string
 *                   example: Nguyễn Văn A
 *                 phone:
 *                   type: string
 *                   example: "0909123456"
 *                 email:
 *                   type: string
 *                   example: nguyenvana@example.com
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Không tìm thấy nhân viên hoặc dữ liệu không hợp lệ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Staff not Found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
/**
 * @swagger
 * /staff/block/{id}:
 *   put:
 *     summary: Khóa (vô hiệu hóa) tài khoản nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của nhân viên cần khóa tài khoản
 *         example: 2
 *     responses:
 *       200:
 *         description: Khóa tài khoản nhân viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 username:
 *                   type: string
 *                   example: nhanvien02
 *                 fullName:
 *                   type: string
 *                   example: Trần Thị B
 *                 email:
 *                   type: string
 *                   example: tranthib@example.com
 *                 phone:
 *                   type: string
 *                   example: "0909456789"
 *                 avatar:
 *                   type: string
 *                   example: https://example.com/avatar.jpg
 *                 isActive:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Không tìm thấy nhân viên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: staff not found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
/**
 * @swagger
 * /staff/unblock/{id}:
 *   put:
 *     summary: Mở khóa tài khoản nhân viên
 *     tags:
 *       - Staff
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của nhân viên cần mở khóa
 *         example: 2
 *     responses:
 *       200:
 *         description: Mở khóa tài khoản nhân viên thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 username:
 *                   type: string
 *                   example: nhanvien02
 *                 fullName:
 *                   type: string
 *                   example: Trần Thị B
 *                 email:
 *                   type: string
 *                   example: tranthib@example.com
 *                 phone:
 *                   type: string
 *                   example: "0909456789"
 *                 avatar:
 *                   type: string
 *                   example: https://example.com/avatar.jpg
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Không tìm thấy nhân viên
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: staff not found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
/**
 * @swagger
 * /staff/changePassword:
 *   put:
 *     summary: Đổi mật khẩu
 *     tags:
 *       - Staff
 *     security:
 *       - BearerAuth: []
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
 *                 example: oldpassword123
 *               newPassword:
 *                 type: string
 *                 example: newpassword456
 *               confirmNewPassword:
 *                 type: string
 *                 example: newpassword456
 *             required:
 *               - username
 *               - password
 *               - newPassword
 *               - confirmNewPassword
 *     responses:
 *       200:
 *         description: Đổi mật khẩu thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc mật khẩu sai
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     userNotFound:
 *                       summary: Người dùng không tồn tại hoặc mật khẩu cũ sai
 *                       value: User or Password is incorrect
 *                     notMatch:
 *                       summary: Mật khẩu mới và xác nhận không khớp
 *                       value: New password and confirm password do not match
 *       403:
 *         description: Không được phép đổi mật khẩu người khác
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not allowed to change this password
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
