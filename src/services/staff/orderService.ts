import { AppDataSource } from "../../config/connection";
import {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../entities/order";
import { OrderItem } from "../../entities/orderItem";
import { Product } from "../../entities/product";
import { User } from "../../entities/user";
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
export interface ICreateOrderInput {
  userId: number;
  address: string;
  note?: string;
  paymentMethod: "cod" | "bank_transfer";
  items: IOrderItemInput[];
}
export interface IOrderItemInput {
  productId: number;
  price: number;
  quantity: number;
}
const orderItemRepository = AppDataSource.getRepository(OrderItem);
const OrderRepository = AppDataSource.getRepository(Order);
const userRepository = AppDataSource.getRepository(User);
const productRepository = AppDataSource.getRepository(Product);
export const OrderService = {
  create: async (data: ICreateOrderInput) => {
    const { userId, address, note, paymentMethod, items } = data;
    const user = await userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequest("User not found", 404);
    let totalAmount = 0;
    const orderItemsToSave: OrderItem[] = [];
    for (const item of items) {
      const product = await productRepository.findOneBy({ id: item.productId });
      if (!product) throw new BadRequest(`Product not found`, 404);
      const orderItem = OrderItem.create({
        product,
        quantity: item.quantity,
        price: product.price,
      });
      totalAmount += product.price * item.quantity;

      orderItemsToSave.push(orderItem);
    }
    const order = OrderRepository.create({
      user,
      address,
      note: note || "",
      PaymentMethod: paymentMethod as PaymentMethod,
      totalAmount,
      status: OrderStatus.PENDING,
      paymentStatus:
        paymentMethod === "bank_transfer"
          ? PaymentStatus.PAID
          : PaymentStatus.UNPAID,
    });

    await OrderRepository.save(order);
    for (const oi of orderItemsToSave) {
      oi.order = order;
      await orderItemRepository.save(oi);
    }
    const fullOrder = await OrderRepository.findOne({
      where: { id: order.id },
      relations: ["orderItems", "orderItems.product", "user"],
    });

    return fullOrder;
  },
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
    const query = OrderRepository.createQueryBuilder("order").leftJoinAndSelect(
      "order.user",
      "user"
    );
    if (paymentStatus)
      query.andWhere("order.paymentStatus = :paymentStatus", { paymentStatus });
    if (paymentMethod)
      query.andWhere("order.PaymentMethod = :paymentMethod", { paymentMethod });
    if (status) query.andWhere("order.status = :status", { status });
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
    orders.forEach((order) => {
      if (order.user) {
        delete order.user.password,
        delete order.user.createdAt,
        delete order.user.updatedAt;
      }
    });
    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limitNumber),
    };
  },
  getById: async (id: number) => {
    const fullOrder = await OrderRepository.findOne({
      where: { id },
      relations: ["orderItems", "orderItems.product", "user"],
    });
    if (!fullOrder) throw new BadRequest("Order not found", 404);
    return fullOrder;
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
    order.paymentStatus = PaymentStatus.PAID;
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
