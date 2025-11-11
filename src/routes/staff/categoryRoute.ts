import { Router } from "express";
import { CategoryController } from "../../controllers/staff/categoryController";
import { validateDTO } from "../../middlewares/validateDTO";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../../dto/category.dto";
const router = Router();
// staff
router.post("/create", validateDTO(CreateCategoryDTO), CategoryController.create);
router.get("/getAll", CategoryController.getAll);
router.get("/getById/:id", CategoryController.getById);
router.put("/update/:id", validateDTO(UpdateCategoryDTO), CategoryController.update);
router.delete("/delete/:id", CategoryController.delete);
router.put("/block/:id", CategoryController.block);


export default router;
