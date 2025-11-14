import swaggerJSDoc from "swagger-jsdoc";

const clientOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Client API", version: "1.0.0" },
    servers: [{ url: "/api", description: "Client server" }],
  },
  apis: ["./src/routes/user/*.ts","./src/routes/*.ts"], 
};

export default swaggerJSDoc(clientOptions);
