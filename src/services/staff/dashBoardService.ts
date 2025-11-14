import dayjs from "dayjs";
import { AppDataSource } from "../../config/connection";
import { Category } from "../../entities/category";
import { Order } from "../../entities/order";
import { OrderItem } from "../../entities/orderItem";
import { Product } from "../../entities/product";
import { BadRequest } from "../../utils/helper/badRequest";

const orderRepository = AppDataSource.getRepository(Order);
const orderItemRepository = AppDataSource.getRepository(OrderItem);
const categoryRepository = AppDataSource.getRepository(Category);
export const DashboardService = {
  getSummaryTopUser: async () => {
    const topOrders = await AppDataSource.query(`
    SELECT u.id, u.username, u.fullName, u.phone, u.email, COUNT(o.id) AS totalOrders
    FROM \`order\` o
    JOIN \`user\` u ON o.userId = u.id
    GROUP BY u.id
    ORDER BY totalOrders DESC
    LIMIT 5
    `);
    const topTotalPrice = await AppDataSource.query(`
    SELECT u.id, u.username, u.fullName, u.phone, u.email, SUM(o.totalAmount) AS totalPrice
    FROM \`order\` o
    JOIN \`user\` u ON o.userId = u.id
    GROUP BY u.id
    ORDER BY totalPrice DESC
    LIMIT 5
    `);
    // khoảng cách trung bình giữa các đơn hàng của khách,
    const averageCycle = await AppDataSource.query(`
      SELECT 
        t.userId, u.username, u.fullName, u.phone, u.email,
        AVG(t.createdAt - t.prev_created_at) AS averageCycle
      FROM (
        SELECT 
          userId,
          createdAt,
          LAG(createdAt) OVER (PARTITION BY userId ORDER BY createdAt) AS prev_created_at
        FROM \`order\`
      ) t
       JOIN \`user\` u ON t.userId = u.id
      WHERE t.prev_created_at IS NOT NULL
      GROUP BY t.userId
    `);

    return { topOrders, topTotalPrice, averageCycle };
  },
  getTopProduct: async (categoryId?: number, getTop: number = 5) => {
    if (categoryId) {
      const category = await categoryRepository.findOneBy({ id: categoryId });
      if (!category) throw new BadRequest("Category not found", 404);
    }
    // Theo số lượng bán
    const topTotalQuantitySaleQB = orderItemRepository
      .createQueryBuilder("oi")
      .select("oi.productId", "productId")
      .innerJoin(Product, "p", "oi.productId = p.id")
      .addSelect("p.name", "name")
      .addSelect("p.description", "description")
      .addSelect("p.price", "price")
      .addSelect("p.image", "image")
      .addSelect("SUM(oi.quantity)", "totalQuantitySale")
      .groupBy("p.id")
      .orderBy("totalQuantitySale", "DESC")
      .limit(getTop);

    if (categoryId) {
      topTotalQuantitySaleQB.where("p.categoryId = :categoryId", {
        categoryId,
      });
    }

    const topTotalQuantitySale = await topTotalQuantitySaleQB.getRawMany();

    // Top sản phẩm theo doanh thu
    const topRevenueProductQB = orderItemRepository
      .createQueryBuilder("oi")
      .select("oi.productId", "productId")
      .innerJoin(Product, "p", "oi.productId = p.id")
      .addSelect("p.name", "name")
      .addSelect("p.description", "description")
      .addSelect("p.price", "price")
      .addSelect("p.image", "image")
      .addSelect("SUM(oi.quantity)", "totalQuantitySale")
      .addSelect("SUM(oi.quantity * oi.price)", "totalRevenue")
      .groupBy("p.id")
      .orderBy("totalRevenue", "DESC")
      .limit(getTop);

    if (categoryId) {
      topRevenueProductQB.where("p.categoryId = :categoryId", { categoryId });
    }

    const topRevenueProduct = await topRevenueProductQB.getRawMany();

    return { topTotalQuantitySale, topRevenueProduct };
  },
    getTopCategory: async () => {
      const topCategoryQuantitySale = await AppDataSource.query(
        `
          SELECT c.name, SUM(oi.quantity) AS totalCategory
          FROM order_item oi
          JOIN \`product\` p  ON oi.productId = p.id
          JOIN \`category\` c  ON p.categoryId = c.id
          GROUP BY c.id
          ORDER BY totalCategory DESC
          LIMIT 5
        `
      );
      const topCategoryRevenue = await AppDataSource.query(
        `
          SELECT c.name, SUM(oi.quantity*oi.price) AS totalRevenue
          FROM order_item oi
          JOIN \`product\` p  ON oi.productId = p.id
          JOIN \`category\` c  ON p.categoryId = c.id
          GROUP BY c.id
          ORDER BY totalRevenue DESC
          LIMIT 5
        `
      );

      return { topCategoryQuantitySale, topCategoryRevenue };
    },
  getTopOrder: async () => {
    const revenueByDay = await AppDataSource.query(`
        SELECT
            DATE(FROM_UNIXTIME(createdAt)) AS orderDate,
            COUNT(*) AS totalOrders,
            SUM(totalAmount) AS totalRevenue
        FROM \`order\`
        WHERE paymentStatus = 'paid'
        GROUP BY orderDate
        ORDER BY orderDate DESC
        LIMIT 30;
      `);
    const revenueByStatus = await AppDataSource.query(`
        SELECT status, SUM(totalAmount) AS revenueByStatus
        FROM \`order\`
        GROUP BY status
      `);
    const revenueByPaymentStatus = await AppDataSource.query(`
        SELECT PaymentStatus, SUM(totalAmount) AS revenueByPayStatus
        FROM \`order\`
        GROUP BY PaymentStatus
      `);

    return { revenueByDay, revenueByStatus, revenueByPaymentStatus };
  },
  getRevenueTodayVsLastMonth: async () => {
    const revenueTodayResult = await AppDataSource.query(`
        SELECT SUM(totalAmount) AS totalRevenue
        FROM \`order\`
        WHERE createdAt >= UNIX_TIMESTAMP(CURDATE())
          AND createdAt < UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)
      `);
    const revenueLastMonthResult = await AppDataSource.query(`
        SELECT SUM(totalAmount) AS totalRevenue
        FROM \`order\`
        WHERE createdAt >= UNIX_TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL 1 MONTH))
          AND createdAt < UNIX_TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL 1 MONTH) + INTERVAL 1 DAY)
      `);
    const revenueToday = revenueTodayResult[0]?.totalRevenue
      ? parseFloat(revenueTodayResult[0].totalRevenue)
      : 0;
    const revenueLastMonth = revenueLastMonthResult[0]?.totalRevenue
      ? parseFloat(revenueLastMonthResult[0].totalRevenue)
      : 0;
    return {
      revenueToday,
      revenueLastMonth,
    };
  },
  getMonthlyRevenue: async (filterYear: number) => {
    const year = filterYear || dayjs().year();

    const revenue = await AppDataSource.query(`
      SELECT 
        MONTH(FROM_UNIXTIME(createdAt)) AS month,
        SUM(totalAmount) AS totalRevenue
      FROM \`order\`
      WHERE YEAR(FROM_UNIXTIME(createdAt)) = ${year}
      GROUP BY MONTH(FROM_UNIXTIME(createdAt))
      ORDER BY month
    `);

    const revenueByMonth: { month: number; totalRevenue: number }[] = [];
    for (let m = 1; m <= 12; m++) {
      const monthData = revenue.find((r: any) => r.month === m);
      revenueByMonth.push({
        month: m,
        totalRevenue: monthData ? parseFloat(monthData.totalRevenue) : 0,
      });
    }

    return {
      year,
      revenueByMonth,
    };
  },
};

