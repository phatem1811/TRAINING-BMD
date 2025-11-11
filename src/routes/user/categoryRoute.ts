import { Router } from "express";
import { CategoryController } from "../../controllers/user/categoryController";
const router = Router();

router.get("/getAll", CategoryController.getAll);

export default router;
