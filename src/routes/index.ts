import { Router } from "express";
import AuthRoute from "./authRoute";
import UserRoute from "./userRoute";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/user", UserRoute);
export default router;
