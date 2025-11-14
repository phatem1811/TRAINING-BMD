import { Router } from "express";
import { DashBoardController } from "../../controllers/staff/dashBoardController";
const router = Router();


router.get("/getSummaryTopUser", DashBoardController.getSummaryTopUser);
router.get("/getTopProduct", DashBoardController.getTopProduct);
router.get("/getTopCategory", DashBoardController.getTopCategory);
router.get("/getTopOrder", DashBoardController.getTopOrder);
router.get("/getRevenueTodayVsLastMonth", DashBoardController.getRevenueTodayVsLastMonth);
router.get("/getMonthlyRevenue", DashBoardController.getMonthlyRevenue);


export default router;


/**
 * @swagger
 * /staff/dashboard/getTopProduct:
 *   get:
 *     summary: Lấy top sản phẩm theo số lượng và doanh thu
 *     description: Lấy danh sách top sản phẩm theo tổng số lượng bán và tổng doanh thu.
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: false
 *         description: ID danh mục sản phẩm cần lọc
 *       - in: query
 *         name: getTop
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: Số lượng sản phẩm top cần lấy
 *     responses:
 *       200:
 *         description: Thành công, trả về top sản phẩm theo số lượng và doanh thu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 topTotalQuantitySale:
 *                   type: array
 *                   description: Top sản phẩm theo tổng số lượng bán
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Tên sản phẩm
 *                       description:
 *                         type: string
 *                         description: Mô tả sản phẩm
 *                       price:
 *                         type: number
 *                         description: Giá sản phẩm
 *                       image:
 *                         type: string
 *                         description: URL ảnh sản phẩm
 *                       totalQuantitySale:
 *                         type: number
 *                         description: Tổng số lượng bán
 *                 topRevenueProduct:
 *                   type: array
 *                   description: Top sản phẩm theo tổng doanh thu
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         description: Tên sản phẩm
 *                       description:
 *                         type: string
 *                         description: Mô tả sản phẩm
 *                       price:
 *                         type: number
 *                         description: Giá sản phẩm
 *                       image:
 *                         type: string
 *                         description: URL ảnh sản phẩm
 *                       totalRevenue:
 *                         type: number
 *                         description: Tổng doanh thu của sản phẩm
 */
/**
 * @swagger
 * /staff/dashboard/getSummaryTopUser:
 *   get:
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     summary: Lấy thông tin thống kê khách hàng
 *     description: >
 *       Trả về 3 loại thông tin thống kê về khách hàng:
 *         1. Top khách hàng có số đơn hàng nhiều nhất topOrders  
 *         2. Top khách hàng có tổng giá trị đơn hàng cao nhất topTotalPrice 
 *         3. Chu kỳ mua trung bình của từng khách hàng averageCycle
 *       Chu kỳ mua được tính là trung bình khoảng thời gian (giây) giữa các đơn liên tiếp.
 *     responses:
 *       200:
 *         description: Thống kê khách hàng trả về thành công
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
 *                   example: fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     topOrders:
 *                       type: array
 *                       description: Danh sách top khách hàng theo số lượng đơn
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "user1"
 *                           fullName:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           phone:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           email:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           totalOrders:
 *                             type: string
 *                             example: "3"
 *                     topTotalPrice:
 *                       type: array
 *                       description: Danh sách top khách hàng theo tổng giá trị đơn
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "user4"
 *                           fullName:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           phone:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           email:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           totalPrice:
 *                             type: string
 *                             example: "500000"
 *                     averageCycle:
 *                       type: array
 *                       description: Chu kỳ mua trung bình của khách hàng tính theo giây
 *                       items:
 *                         type: object
 *                         properties:
 *                           userId:
 *                             type: integer
 *                             example: 1
 *                           username:
 *                             type: string
 *                             example: "user4"
 *                           fullName:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           phone:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           email:
 *                             type: string
 *                             nullable: true
 *                             example: null
 *                           averageCycle:
 *                             type: string
 *                             description: Trung bình khoảng cách giữa các đơn hàng liên tiếp (tính bằng giây)
 *                             example: "41079.0000"
 */
/**
 * @swagger
 * /staff/dashboard/getRevenueTodayVsLastMonth:
 *   get:
 *     summary: Lấy doanh thu hôm nay và cùng ngày tháng trước
 *     description: API dùng để lấy tổng doanh thu của ngày hiện tại và tổng doanh thu của cùng ngày tháng trước (so sánh xu hướng doanh thu ngắn hạn).
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công, trả về doanh thu của ngày hiện tại và cùng ngày tháng trước
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 revenueToday:
 *                   type: number
 *                   example: 50000
 *                   description: Tổng doanh thu của ngày hiện tại
 *                 revenueLastMonth:
 *                   type: number
 *                   example: 0
 *                   description: Tổng doanh thu của cùng ngày trong tháng trước
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /staff/dashboard/getMonthlyRevenue:
 *   get:
 *     summary: Lấy doanh thu theo từng tháng trong năm
 *     description: Lấy tổng doanh thu của từng tháng trong năm.
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           example: 2025
 *         required: false
 *         description: Năm cần lấy dữ liệu doanh thu
 *     responses:
 *       200:
 *         description: Thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 year:
 *                   type: integer
 *                   description: Năm 
 *                   example: 2025
 *                 revenueByMonth:
 *                   type: array
 *                   description: Danh sách doanh thu theo từng tháng
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: integer
 *                         description: Tháng trong năm (1 - 12)
 *                         example: 5
 *                       totalRevenue:
 *                         type: number
 *                         description: Tổng doanh thu trong tháng đó
 *                         example: 12500000
 */
/**
 * @swagger
 * /staff/dashboard/getTopCategory:
 *   get:
 *     summary: Lấy top danh mục theo số lượng bán và doanh thu
 *     description: Trả về danh sách top 5 danh mục có tổng số lượng sản phẩm bán và tổng doanh thu cao nhất.
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
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
 *                   example: fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     topCategoryQuantitySale:
 *                       type: array
 *                       description: Top danh mục theo tổng số lượng sản phẩm bán
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Gà"
 *                             description: Tên danh mục sản phẩm
 *                           totalCategory:
 *                             type: string
 *                             example: "15"
 *                             description: Tổng số lượng sản phẩm đã bán trong danh mục
 *                     topCategoryRevenue:
 *                       type: array
 *                       description: Top danh mục theo tổng doanh thu
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Gà"
 *                             description: Tên danh mục sản phẩm
 *                           totalRevenue:
 *                             type: string
 *                             example: "750000"
 *                             description: Tổng doanh thu của danh mục
 */

/**
 * @swagger
 * /staff/dashboard/getTopOrder:
 *   get:
 *     summary: Lấy thống kê đơn hàng theo ngày, trạng thái và trạng thái thanh toán
 *     description: API trả về doanh thu.
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công, trả về thống kê đơn hàng theo nhiều tiêu chí
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
 *                   example: fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     revenueByDay:
 *                       type: array
 *                       description: Doanh thu và số lượng đơn hàng theo từng ngày (30 ngày gần nhất)
 *                       items:
 *                         type: object
 *                         properties:
 *                           orderDate:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-11-12T17:00:00.000Z"
 *                             description: Ngày đặt hàng
 *                           totalOrders:
 *                             type: string
 *                             example: "3"
 *                             description: Tổng số đơn hàng trong ngày
 *                           totalRevenue:
 *                             type: string
 *                             example: "550000"
 *                             description: Tổng doanh thu trong ngày
 *                     revenueByStatus:
 *                       type: array
 *                       description: Doanh thu được nhóm theo trạng thái đơn hàng
 *                       items:
 *                         type: object
 *                         properties:
 *                           status:
 *                             type: string
 *                             example: "completed"
 *                             description: Trạng thái đơn hàng (pending, confirmed, shipping, completed, cancelled)
 *                           revenueByStatus:
 *                             type: string
 *                             example: "50000"
 *                             description: Tổng doanh thu của các đơn hàng theo trạng thái này
 *                     revenueByPaymentStatus:
 *                       type: array
 *                       description: Doanh thu được nhóm theo trạng thái thanh toán
 *                       items:
 *                         type: object
 *                         properties:
 *                           PaymentStatus:
 *                             type: string
 *                             example: "paid"
 *                             description: Trạng thái thanh toán (paid, unpaid, refund)
 *                           revenueByPayStatus:
 *                             type: string
 *                             example: "600000"
 *                             description: Tổng doanh thu của các đơn hàng theo trạng thái thanh toán
 */
