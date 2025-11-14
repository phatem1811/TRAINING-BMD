import { Router } from "express";
import { CategoryController } from "../../controllers/staff/categoryController";
import { createCategory, updateCategory } from "../../validate/categoryValidation";
import { validateJoi } from "../../middlewares/validateJoi";
const router = Router();
// staff
router.post("/create", validateJoi(createCategory), CategoryController.create);
router.get("/getAll", CategoryController.getAll);
router.get("/getById/:id", CategoryController.getById);
router.put("/update/:id", validateJoi(updateCategory), CategoryController.update);
router.delete("/delete/:id", CategoryController.delete);
router.put("/block/:id", CategoryController.block);
router.put("/unblock/:id", CategoryController.unblock);


export default router;

/**
 * @swagger
 * /staff/category/create:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Category
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
 *                 example: "New Category"
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /staff/category/getAll:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Category
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
 *         name: isActive
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Filter categories by isActive
 *     responses:
 *       200:
 *         description: List categories   
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                 total:
 *                   type: integer
 *                   description: Total number of categories
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
 * /staff/category/getById/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category retrieved successfully
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
 *                   example: "Get By id successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /staff/category/update/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Category Name"
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *                   example: "Update successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     name:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *       400:
 *         description: Category name already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category name 'Updated Category Name' already exists"
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /staff/category/block/{id}:
 *   put:
 *     summary: Khóa category 
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của category cần khóa
 *         example: 3
 *     responses:
 *       200:
 *         description: Khóa category thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: Danh mục A
 *                 description:
 *                   type: string
 *                   example: Mô tả category A
 *                 isActive:
 *                   type: boolean
 *                   example: false
 *       400:
 *         description: Không tìm thấy category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: category not found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */

/**
 * @swagger
 * /staff/category/unblock/{id}:
 *   put:
 *     summary: Mở khóa category 
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của category cần mở khóa
 *         example: 3
 *     responses:
 *       200:
 *         description: Mở khóa category thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: Danh mục A
 *                 description:
 *                   type: string
 *                   example: Mô tả category A
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Không tìm thấy category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: category not found
 *       401:
 *         description: Không có hoặc token không hợp lệ
 *       500:
 *         description: Lỗi máy chủ nội bộ
 */
