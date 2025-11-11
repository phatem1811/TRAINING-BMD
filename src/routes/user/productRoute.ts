import { Router } from "express";
import { ProductController } from "../../controllers/user/productController";
const router = Router();

router.get("/getAll", ProductController.getAll);
router.get("/getById/:id", ProductController.getById);


export default router;
