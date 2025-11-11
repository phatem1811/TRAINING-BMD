import { Router } from "express";
import { ProductController } from "../../controllers/staff/productController";
import { uploadImage } from "../../middlewares/upload";
import { validateDTO } from "../../middlewares/validateDTO";
import { CreateProductDTO, UpdatProductDTO } from "../../dto/product.dto";
const router = Router();

router.post("/create",validateDTO(CreateProductDTO), ProductController.create);

router.get("/getAll", ProductController.getAll);
router.get("/getById/:id", ProductController.getById);

router.put("/update/:id",validateDTO(UpdatProductDTO), ProductController.update);

router.delete("/delete/:id", ProductController.delete);
router.put("/block/:id", ProductController.block);

export default router;
