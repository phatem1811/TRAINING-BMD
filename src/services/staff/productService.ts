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

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;
    query.skip(skip).take(limitNumber);
    query.orderBy("product.createdAt", "DESC");

    const [products, total] = await query.getManyAndCount();
    return {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limitNumber),
    };
  },
  getById: async (id: number) => {
    const product = await productRepository.findOneBy({ id: id });
    if (!product) throw new BadRequest("product not Found", 400);
    return product;
  },
  create: async (reqBody: IProduct) => {
    const { name, image, description, price, categoryId } = reqBody;
    const category = await categoryRepository.findOneBy({ id: categoryId });
    if (!category) throw new BadRequest("Category not found", 400);

    const product = productRepository.create({
      name,
      image: image,
      description,
      price,
      category,
    });
    await productRepository.save(product);
    return product;
  },
  update: async (id: number, reqBody: IProduct, imageUrl: string) => {
    const { name, description, price, image } = reqBody;
    const product = await productRepository.findOneBy({ id: id });
    if (!product) throw new BadRequest("product not Found", 400);
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (imageUrl !== undefined) product.image = imageUrl;
    const updated = await productRepository.save(product);
    return updated;
  },
  delete: async (id: number) => {
    const product = await productRepository.findOneBy({ id: id });
    if (!product) throw new BadRequest("category not found", 404);
    await productRepository.remove(product);
    return null;
  },
  block: async (id: number) => {
    const product = await ProductService.getById(id);
    if (!product) throw new BadRequest("Product not found", 404);

    product.isActive = false;
    return await categoryRepository.save(product);
  },
};
