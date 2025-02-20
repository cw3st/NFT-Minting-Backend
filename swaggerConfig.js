const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NFT Minting API",
      version: "1.0.0",
      description: "API documentation for the NFT Minting backend",
    },
    servers: [
      {
        url: "http://localhost:5000", // Update with your deployed URL later
      },
    ],
  },
  apis: ["./routes/*.js"], // Adjust this if your routes are in another location
};

const specs = swaggerJsdoc(options);

module.exports = specs;