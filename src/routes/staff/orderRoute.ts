import { Router } from "express";
import { OrderController } from "../../controllers/staff/orderController";
import { validateDTO } from "../../middlewares/validateDTO";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../../dto/category.dto";
const router = Router();
// staff

router.get("/getAll", OrderController.getAll);
router.get("/getById/:id", OrderController.getById);

router.put("/orders/confirm/:id", OrderController.confirmOrder);
router.put("/orders/shipping/:id", OrderController.shippingOrder);
router.put("/orders/complete/:id", OrderController.completeOrder);
router.put("/orders/cancel/:id", OrderController.cancelOrder);

router.put("/orders/paid/:id", OrderController.confirmPaid);
router.put("/orders/refund/:id", OrderController.refundOrder);


export default router;
