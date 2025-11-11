import { AppDataSource } from "../../config/connection";
import {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../entities/order";
import { BadRequest } from "../../utils/helper/badRequest";
interface IFilterOrder {
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  status?: OrderStatus;
  search?: string;
  userId?: number;
  page?: number;
  limit?: number;
}
const OrderRepository = AppDataSource.getRepository(Order);
export const OrderService = {
  getAll: async (filter: IFilterOrder) => {
    const {
      paymentStatus,
      paymentMethod,
      status,
      userId,
      page,
      limit,
      search,
    } = filter;
    const query = OrderRepository.createQueryBuilder("order").leftJoin(
      "order.user",
      "user"
    );
    if (paymentStatus)
      query.andWhere("order.paymentStatus = :paymentStatus", { paymentStatus });
    if (paymentMethod)
      query.andWhere("order.PaymentMethod = :paymentMethod", { paymentMethod });
    if (paymentStatus) query.andWhere("order.status = :status", { status });
    if (userId) query.andWhere("user.id = :userId", { userId });
    if (search) {
      query.andWhere(
        `(user.fullName LIKE :search OR user.username LIKE :search OR user.phone LIKE :search OR user.email LIKE :search)`,
        { search: `%${search}%` }
      );
    }
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    query.skip(skip).take(limitNumber).orderBy("order.createdAt", "DESC");
    const [orders, total] = await query.getManyAndCount();
    return {
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limitNumber),
    };
  },
  getById: async (id: number) => {
    const order = await OrderRepository.createQueryBuilder("order")
      .leftJoin("order.user", "user")
      .leftJoin("order.orderItems", "orderItems")
      .leftJoin("orderItems.product", "product")
      .where("order.id = :id", { id })
      .getOne();
    if (!order) throw new BadRequest("Order not found", 404);
  },
  confirmOrder: async (id: number) => {
    const order = await OrderRepository.findOneBy({ id });
    if (!order) throw new BadRequest("Order not found", 404);
    order.status = OrderStatus.CONFIRMED;
    await OrderRepository.save(order);
    return null;
  },
  shippingOrder: async (id: number) => {
    const order = await OrderRepository.findOneBy({ id });
    if (!order) throw new BadRequest("Order not found", 404);
    order.status = OrderStatus.SHIPPING;
    await OrderRepository.save(order);
    return null;
  },
  completeOrder: async (id: number) => {
    const order = await OrderRepository.findOneBy({ id });
    if (!order) throw new BadRequest("Order not found", 404);
    order.status = OrderStatus.COMPLETED;
    await OrderRepository.save(order);
    return null;
  },
  cancelOrder: async (id: number) => {
    const order = await OrderRepository.findOneBy({ id });
    if (!order) throw new BadRequest("Order not found", 404);
    order.status = OrderStatus.CANCELLED;
    await OrderRepository.save(order);
    return null;
  },
  confirmPaid: async (id: number) => {
    const order = await OrderRepository.findOneBy({ id });
    if (!order) throw new BadRequest("Order not found", 404);
    order.paymentStatus = PaymentStatus.PAID;
    await OrderRepository.save(order);
    return null;
  },
  refundOrder: async (id: number) => {
    const order = await OrderRepository.findOneBy({ id });
    if (!order) throw new BadRequest("Order not found", 404);
    order.paymentStatus = PaymentStatus.REFUND;
    await OrderRepository.save(order);
    return null;
  },
  getSummary: async () => {
    const result = await AppDataSource.query(`
      SELECT status, COUNT(*) AS count
      FROM "order"
      GROUP BY status
    `);
    const summary = result.reduce((acc, r) => {
      acc[r.status] = Number(r.count);
      return acc;
    });
    return summary;
  },
};
