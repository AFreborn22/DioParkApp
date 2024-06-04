// swaggerDocs.js
require('dotenv').config();

const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diopark API',
      version: '1.0.0',
      description: 'This is a REST API for Diopark App',
    },
    servers: [
      {
        url: `${process.env.BASE_URL}/api`,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
};

module.exports = swaggerDefinition;