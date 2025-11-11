import { Category } from "../../entities/category";
import { AppDataSource } from "../../config/connection";
import { BadRequest } from "../../utils/helper/badRequest";
interface ICategory {
  name: string;
}
const categoryRepository = AppDataSource.getRepository(Category);
export const CategoryService = {
  getAll: async (limit: number, page: number) => {
    const skip = (page - 1) * limit;
    const [categories, total] = await categoryRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: "DESC" },
    });
    return {
      categories,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
  getById: async (id: number) => {
    const category = await categoryRepository.findOneBy({ id: id });
    if (!category) throw new BadRequest("Category not Found", 400);
    return category;
  },
  create: async (reqBody: ICategory) => {
    const { name } = reqBody;
    const category = categoryRepository.create({
      name,
    });
    await categoryRepository.save(category);
    return category;
  },
  update: async (id: number, reqBody: ICategory) => {
    const { name } = reqBody;
    const category = await categoryRepository.findOneBy({ id: id });
    if (!category) throw new BadRequest("Category not Found", 400);
    if (name !== undefined) category.name = name;
    const updated = await categoryRepository.save(category);
    return updated;
  },
  delete: async (id: number) => {
    const category = await categoryRepository.findOneBy({ id: id });
    if (!category) throw new BadRequest("category not found", 404);

    await categoryRepository.remove(category);

    return null;
  },
  block: async (id: number) => {
    const category = await CategoryService.getById(id);
    if (!category) throw new BadRequest("category not found", 404);

    category.isActive = false;
    return await categoryRepository.save(category);
  },
};
