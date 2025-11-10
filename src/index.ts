import express from "express";
import router from "./routes/index";
import 'dotenv/config';
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import { logger } from "./config/logger";
import { AppDataSource } from "./config/connection";
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundResponse } from "./utils/helper/response";
import { authMiddleware } from "./middlewares/authMiddleware";
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
    next(notFoundResponse(res))
})
