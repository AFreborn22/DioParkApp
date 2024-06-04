// swaggerDocs.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Diopark API',
      version: '1.0.0',
      description: 'This is a REST API for Diopark App',
    },
    servers: [
      {
        url: `${process.env.BASE_URL}`,
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
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;