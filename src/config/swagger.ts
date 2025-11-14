import express from "express";
import adminSwaggerSpec from "./swaggerAdmin";
import clientSwaggerSpec from "./swaggerCilent";

const router = express.Router();

// Xuất file JSON cho Swagger UI
router.get("/docs/admin.json", (req, res) => res.json(adminSwaggerSpec));
router.get("/docs/client.json", (req, res) => res.json(clientSwaggerSpec));

export default router;