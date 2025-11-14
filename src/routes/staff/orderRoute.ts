import { Router } from "express";
import { OrderController } from "../../controllers/staff/orderController";
import { validateJoi } from "../../middlewares/validateJoi";
import { createOrder } from "../../validate/orderValidation";
const router = Router();
// staff

router.get("", OrderController.getAll);
router.get("/:id", OrderController.getById);
router.post("", validateJoi(createOrder), OrderController.create);

router.put("/:id/confirm", OrderController.confirmOrder);
router.put("/:id/shipping", OrderController.shippingOrder);
router.put("/:id/complete", OrderController.completeOrder);
router.put("/:id/cancel", OrderController.cancelOrder);

router.put("/:id/paid", OrderController.confirmPaid);
router.put("/:id/refund", OrderController.refundOrder);


export default router;
/**
 * @swagger
 * /staff/order:
 *   get:
 *     summary: Get list of orders (with filters and pagination)
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: paymentStatus
 *         schema:
 *           type: string
 *           enum: [unpaid, paid, refunded]
 *         description: Filter by payment status
 *       - in: query
 *         name: paymentMethod
 *         schema:
 *           type: string
 *           enum: [cod, bank_transfer]
 *         description: Filter by payment method
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, confirmed, shipping, completed, cancelled]
 *         description: Filter by order status
 *       - in: query
 *         name: userId
 *         schema:
 *           type: integer
 *         description: Filter by user ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by user's full name, username, phone, or email
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Current page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: List of orders fetched successfully
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
 *                   example: Get all successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       createdAt:
 *                         type: string
 *                         example: "1762922986"
 *                       updatedAt:
 *                         type: string
 *                         example: "1762922986"
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
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 page:
 *                   type: string
 *                   example: "1"
 *                 limit:
 *                   type: string
 *                   example: "10"
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/order:
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
 *               userId:
 *                 type: number
 *                 example: 1
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
 * /staff/order/{id}:
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
 * /staff/order/{id}/confirm:
 *   put:
 *     summary: Confirm an order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID to confirm
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order confirmed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/order/{id}/shipping:
 *   put:
 *     summary: Mark an order as shipping
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID to mark as shipping
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order status updated to shipping
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/order/{id}/complete:
 *   put:
 *     summary: Complete an order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID to mark as completed
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order completed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/order/{id}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID to cancel
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/order/{id}/paid:
 *   put:
 *     summary: Mark an order as paid
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID to mark as paid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Payment confirmed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/order/{id}/refund:
 *   put:
 *     summary: Refund an order
 *     tags:
 *       - Order
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Order ID to refund
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order refunded successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */