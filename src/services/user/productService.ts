import { AppDataSource } from "../../config/connection";
import { BadRequest } from "../../utils/helper/badRequest";
import { Product } from "../../entities/product";
import { Category } from "../../entities/category";
interface IProduct {
  name: string;
  image: string;
  description: string;
  price: number;
  categoryId: number;
}
interface IProductFilter {
  name?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}
const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);
export const ProductService = {
  getAll: async (filter: IProductFilter) => {
    const { limit, page, categoryId, minPrice, maxPrice, name } = filter;

    const query = productRepository
      .createQueryBuilder("product") // select * FROM Product as product
      .leftJoinAndSelect("product.category", "category"); //LEFT JOIN category AS category ON  product.categoryId = category.id
    if (name) query.andWhere("product.name LIKE :name", { name: `%${name}%` });
    if (categoryId)
      query.andWhere("category.id = :categoryId", { categoryId: categoryId });
    if (minPrice) query.andWhere("product.price >= :minPrice", { minPrice });
    if (maxPrice) query.andWhere("product.price <= :maxPrice", { maxPrice });
    let activeStatus: number = 1; 
    query.andWhere("product.isActive = :activeStatus", { activeStatus });
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    query.skip(skip).take(limit);
    query.orderBy("product.createdAt", "DESC");

    const [products, total] = await query.getManyAndCount();
    return {
      data: products,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    };
  },
  getById: async (id: number) => {
    const product = await productRepository.findOneBy({ id: id });
    if (!product) throw new BadRequest("product not Found", 400);
    return product;
  },


};
