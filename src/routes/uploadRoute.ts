import { Router } from "express";
import { UploadController } from "../controllers/uploadController";
import { uploadFile } from "../middlewares/upload";
const router = Router();

router.post("/image",uploadFile.single('image'), UploadController.uploadImage);
router.post("/file",uploadFile.single('file'), UploadController.uploadImage);

export default router;
