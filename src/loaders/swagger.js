const swaggerJsdoc = require('swagger-jsdoc');
const { routes } = require("../api/routes/index");
const swaggerUi = require('swagger-ui-express');

module.exports = app => {
  // Define the Swagger options
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for our application',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: [], // Leave this empty to dynamically add routes below
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Loop through your routes and add their Swagger definitions
  routes.forEach(route => {
    if (route.swagger) {
      swaggerSpec.paths = swaggerSpec.paths || {};
      swaggerSpec.paths[route.path] = swaggerSpec.paths[route.path] || {};

      // Assign Swagger info for each method
      swaggerSpec.paths[route.path][route.method.toLowerCase()] = route.swagger;
    }
  })


  // Now you can use this in your Swagger UI setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
