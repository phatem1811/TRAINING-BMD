import express from "express";
import router from "./routes/index";
import "dotenv/config";
import "reflect-metadata";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { logger } from "./config/logger";
import { AppDataSource } from "./config/connection";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundResponse } from "./utils/helper/response";
import { authMiddleware } from "./middlewares/authMiddleware";
import docsRouter from "./config/swagger";
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const swaggerOptions = {
  explorer: true,
  swaggerOptions: {
    urls: [
      { url: "/api/docs/admin.json", name: "Admin API" },
      { url: "/api/docs/client.json", name: "Client API" },
    ],
  },
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(undefined, swaggerOptions));

app.use("/api", docsRouter);
AppDataSource.initialize()
  .then(() => {
    logger.info("Data Source has been initialized!");

    app.listen(port, () => {
      logger.info(`Server is running at http://${host}:${port}`);
    });
  })
  .catch((err) => {
    logger.error("Error during Data Source initialization:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use(authMiddleware);
app.use("/api", router);
app.use(errorHandler);
app.use((req, res, next) => {
  next(notFoundResponse(res));
});
