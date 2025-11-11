import { Router } from "express";
import { UserController } from "../../controllers/user/userController";
import { CreateUserDTO } from "../../dto/user.dto";
import { validateDTO } from "../../middlewares/validateDTO";
import { uploadImage } from "../../middlewares/upload";
const router = Router();

router.post("/auth/login", UserController.login)
router.post("/auth/signup",validateDTO(CreateUserDTO), UserController.signUp)

router.get("/getProfile", UserController.getProfile);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getById/:id", UserController.getById);

router.put("/updateProfile/:id", UserController.updateProfile);
router.delete("/delete/:id", UserController.delete);
router.put("/block/:id", UserController.block);

router.post("/changePassword", UserController.changePassword)

export default router;
