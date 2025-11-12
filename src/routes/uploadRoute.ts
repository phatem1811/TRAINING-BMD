import { Router } from "express";
import { UploadController } from "../controllers/uploadController";
import { uploadFile } from "../middlewares/upload";
const router = Router();

router.post("/image",uploadFile.single('image'), UploadController.uploadImage);
router.post("/file",uploadFile.single('file'), UploadController.uploadImage);

export default router;

/**
 * @swagger
 * /upload/image:
 *   post:
 *     summary: Upload an image
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                   example: "image-1762913650309-50985783.png"
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/upload/image/image-1762913650309-50985783.png"
 *       400:
 *         description: Image not found or invalid
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /upload/file:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - Upload
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filename:
 *                   type: string
 *                   example: "file-1762913650309-50985783.pdf"
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/upload/file/file-1762913650309-50985783.pdf"
 *       400:
 *         description: File not found or invalid
 *       500:
 *         description: Internal server error
 */
