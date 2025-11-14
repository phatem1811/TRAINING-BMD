import { AppDataSource } from "../../config/connection";
import { OrderItem } from "../../entities/orderItem";
import {
  Order,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../entities/order";
import { User } from "../../entities/user";
import { Product } from "../../entities/product";
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
  create: async (data: ICreateOrderInput, curentUser: number) => {
    const { userId, address, note, paymentMethod, items } = data;
    const user = await userRepository.findOneBy({ id: curentUser });
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
  getById: async (id: number) => {
    const fullOrder = await OrderRepository.findOne({
      where: { id },
      relations: ["orderItems", "orderItems.product", "user"],
    });
    if (!fullOrder) throw new BadRequest("Order not found", 404);
    return fullOrder;
  },
  getSummary: async (id: number) => {
    const result = await AppDataSource.query(
      `
    SELECT status, COUNT(*) AS count
    FROM \`order\`
    WHERE userId = ?
    GROUP BY status
    `,
      [id]
    );
    const summary = Object.values(OrderStatus).reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {});
    result.forEach((r: any) => {
      summary[r.status] = Number(r.count);
    });

    return summary;
  },
  getOrderHistory: async (id: number) => {
    const result = await AppDataSource.query(
      `
    SELECT *
    FROM \`order\`
    WHERE userId = ?
    ORDER BY "createdAt" DESC
  `,
      [id]
    );
    return result;
  },
};
