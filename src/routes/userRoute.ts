import { Router } from "express";
import { UserController } from "../controllers/userController";
import { CreateUserDTO } from "../dto/user.dto";
import { validateDTO } from "../middlewares/validateDTO";
const router = Router();

router.get("/getProfile", UserController.getProfile);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getAllAdmins", UserController.getAllAdmins);
router.get("/getById/:id", UserController.getById);

router.post("/signup",validateDTO(CreateUserDTO), UserController.signUp)
router.put("/updateProfile/:id", UserController.updateProfile);

router.put("/delete/:id", UserController.delete);

export default router;
