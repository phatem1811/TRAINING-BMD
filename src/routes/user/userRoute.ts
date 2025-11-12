import { Router } from "express";
import { UserController } from "../../controllers/user/userController";
import { validateJoi } from "../../middlewares/validateJoi";
import { createUser } from "../../validate/userValidation";
const router = Router();

router.post("/auth/login", UserController.login)
router.post("/auth/signup",  validateJoi(createUser), UserController.signUp)

router.get("/getProfile", UserController.getProfile);
router.get("/getAllUsers", UserController.getAllUsers);
router.get("/getById/:id", UserController.getById);

router.put("/updateProfile/:id", UserController.updateProfile);
router.delete("/delete/:id", UserController.delete);
router.put("/block/:id", UserController.block);

router.post("/changePassword", UserController.changePassword)

export default router;
