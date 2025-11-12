import { Router } from "express";
import { CategoryController } from "../../controllers/staff/categoryController";
import { createCategory, updateCategory } from "../../validate/categoryValidation";
import { validateJoi } from "../../middlewares/validateJoi";
const router = Router();
// staff
router.post("/create", validateJoi(createCategory), CategoryController.create);
router.get("/getAll", CategoryController.getAll);
router.get("/getById/:id", CategoryController.getById);
router.put("/update/:id", validateJoi(updateCategory), CategoryController.update);
router.delete("/delete/:id", CategoryController.delete);
router.put("/block/:id", CategoryController.block);


export default router;
