import { Category } from "../../entities/category";
import { AppDataSource } from "../../config/connection";
import { Product } from "../../entities/product";
const categoryRepository = AppDataSource.getRepository(Category);
const productRepository = AppDataSource.getRepository(Product);
export const CategoryService = {
  getAll: async () => {
    const categories = await categoryRepository.find({
      order: { createdAt: "DESC" },
    });
    return {
      categories,
    };
  },
 
};
