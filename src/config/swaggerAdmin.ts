import swaggerJSDoc from "swagger-jsdoc";

const adminOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Admin API", version: "1.0.0" },
    servers: [{ url: "/api", description: "Admin server" }],
    components: {
      securitySchemes: {
        BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
  },
  apis: ["./src/routes/staff/*.ts","./src/routes/*.ts"], // chỉ admin
};

export default swaggerJSDoc(adminOptions);
