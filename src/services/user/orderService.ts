import { AppDataSource } from "../../config/connection";
import { Order } from "../../entities/order";

const OrderRepository = AppDataSource.getRepository(Order);
export const OrderService = {
  getSummary: async (id: number) => {
    const result = await AppDataSource.query(
      `
    SELECT status, COUNT(*) AS count
    FROM "order"
    WHERE "id" = $1
    GROUP BY status
  `,
      [id]
    );
    const summary = result.reduce((acc, r) => {
      acc[r.status] = Number(r.count);
      return acc;
    });
    return summary;
  },
  getOrderHistory: async (id: number) => {
    const result = await AppDataSource.query(
      `
    SELECT *
    FROM "order"
    WHERE "userId" = $1
    ORDER BY "createdAt" DESC
  `,
      [id]
    );

    return result;
  },
};
