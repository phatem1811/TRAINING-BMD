import { Router } from "express";
import { ProductController } from "../../controllers/staff/productController";
import { validateJoi } from "../../middlewares/validateJoi";
import { createProduct, updateProduct } from "../../validate/productValidation";
const router = Router();

router.post("/create", validateJoi(createProduct), ProductController.create);
router.get("/getAll", ProductController.getAll);
router.get("/getById/:id", ProductController.getById);

router.put("/update/:id", validateJoi(updateProduct), ProductController.update);

router.delete("/delete/:id", ProductController.delete);
router.put("/block/:id", ProductController.block);
router.put("/unBlock/:id", ProductController.unBlock);

export default router;

/**
 * @swagger
 * /staff/product/create:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "iPhone 15"
 *               price:
 *                 type: number
 *                 example: 2500
 *               image:
 *                 type: string
 *                 example: "https://example.com/images/iphone15.png"
 *               description:
 *                 type: string
 *                 example: "string"
 *               categoryId:
 *                 type: number
 *                 example: 1
 *             required:
 *               - name
 *               - price
 *               - categoryId
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Validation failed or bad request
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /staff/product/getAll:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: categoryId
 *         schema:
 *           type: integer
 *         description: Filter products by category ID
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter products by name
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Filter products by isActive
 *     responses:
 *       200:
 *         description: List products   
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *                       description:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       category:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                           name:
 *                             type: string
 *                 total:
 *                   type: integer
 *                   description: Total number of products
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /staff/product/getById/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Get product successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         isActive:
 *                           type: boolean
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /staff/product/update/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product"
 *               price:
 *                 type: number
 *                 example: 3000
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *               image:
 *                 type: string
 *                 example: "https://example.com/new-image.png"
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     category:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                         isActive:
 *                           type: boolean
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /staff/product/block/{id}:
 *   put:
 *     summary: Block  a product by ID
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product blocked successfully"
 *                 data: ""
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /staff/product/unblock/{id}:
 *   put:
 *     summary: unBlock a product by ID
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product unblocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Product unblocked successfully"
 *                 data: ""               
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
