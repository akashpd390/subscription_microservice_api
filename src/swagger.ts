
import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Subscription API',
      version: '1.0.0',
      description: 'API documentation for Subscription microservice',
    },
    servers: [
      {
        url: 'https://subscription-api-hspi.onrender.com/api', 
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controller/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
