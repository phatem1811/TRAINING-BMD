import swaggerJSDoc from "swagger-jsdoc";
import { envConfig } from "./envConfig";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Example API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      { url: `http://192.168.1.20:${envConfig.PORT}${envConfig.BASE_URL}` },
      {
        url: `http://localhost:${envConfig.PORT}${envConfig.BASE_URL}`,
      },
    ],
  },

  apis: [
    "./src/routes/index.ts",
    "./src/routes/staff/*.ts",
    "./src/routes/user/*.ts",
    "./src/routes/uploadRoute.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
