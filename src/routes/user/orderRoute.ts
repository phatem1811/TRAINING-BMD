import { Router } from "express";
import { OrderController } from "../../controllers/user/orderController";
import { validateJoi } from "../../middlewares/validateJoi";
import { createOrder } from "../../validate/orderValidation";

const router = Router();
// staff

router.post("/create", validateJoi(createOrder), OrderController.create);
router.get("/getById/:id", OrderController.getById);
router.get("/getSummary", OrderController.getSummary);
router.get("/getOrderHistory", OrderController.getOrderHistory);

export default router;

/**
 * @swagger
 * /user/order/create:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "123 Quận 1, TP.HCM"
 *               note:
 *                 type: string
 *                 example: "Giao hàng nhanh"
 *               paymentMethod:
 *                 type: string
 *                 enum: [cod, bank_transfer]
 *                 example: "bank_transfer"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: number
 *                       example: 1
 *                     quantity:
 *                       type: number
 *                       example: 2
 *             required:
 *               - userId
 *               - address
 *               - paymentMethod
 *               - items
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation failed or bad request
 *       404:
 *         description: User or Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/order/getById/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order details successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get order detail successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 2
 *                     createdAt:
 *                       type: string
 *                       example: "1762922986"
 *                     updatedAt:
 *                       type: string
 *                       example: "1762922986"
 *                     address:
 *                       type: string
 *                       example: "CMT8, TP.HCM"
 *                     note:
 *                       type: string
 *                       example: "Giao hàng nhanh"
 *                     totalAmount:
 *                       type: number
 *                       example: 100000
 *                     status:
 *                       type: string
 *                       enum: [pending, confirmed, shipping, completed, cancelled]
 *                       example: "pending"
 *                     paymentStatus:
 *                       type: string
 *                       enum: [unpaid, paid, refund]
 *                       example: "unpaid"
 *                     paymentMethod:
 *                       type: string
 *                       enum: [cod, bank_transfer]
 *                       example: "cod"
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         fullName:
 *                           type: string
 *                           example: "Nguyễn Văn A"
 *                         email:
 *                           type: string
 *                           example: "vana@gmail.com"
 *                         phone:
 *                           type: string
 *                           example: "0901234567"
 *                     orderItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           price:
 *                             type: number
 *                             example: 50000
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                           product:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: integer
 *                                 example: 3
 *                               name:
 *                                 type: string
 *                                 example: "Trà sữa truyền thống"
 *                               imageUrl:
 *                                 type: string
 *                                 example: "https://example.com/product.jpg"
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /user/order/getSummary:
 *   get:
 *     summary: Get order summary by status for the current user
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Get Summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get Summary fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     pending:
 *                       type: integer
 *                       example: 1
 *                     confirmed:
 *                       type: integer
 *                       example: 0
 *                     shipping:
 *                       type: integer
 *                       example: 0
 *                     completed:
 *                       type: integer
 *                       example: 2
 *                     cancelled:
 *                       type: integer
 *                       example: 1
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /user/order/getOrderHistory:
 *   get:
 *     summary: Get order history of the current user
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Get History Order fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Get History Order fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       address:
 *                         type: string
 *                         example: "CMT8, TP.HCM"
 *                       note:
 *                         type: string
 *                         example: "Giao hàng nhanh"
 *                       totalAmount:
 *                         type: number
 *                         example: 100000
 *                       status:
 *                         type: string
 *                         example: "pending"
 *                       paymentStatus:
 *                         type: string
 *                         example: "unpaid"
 *                       paymentMethod:
 *                         type: string
 *                         example: "cod"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-12T10:30:00.000Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-11-12T10:45:00.000Z"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
