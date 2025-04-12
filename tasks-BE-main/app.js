require('dotenv').config(); // Load environment variables
const express = require('express');
const tasksRoute = require('./routes/admin');
const authRoute = require('./routes/auth');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
// // Import the static OpenAPI spec
// try {
//   const openApiSpec = require('./swagger.json'); // Adjust the path if necessary
//   console.log('OpenAPI Spec Loaded:', openApiSpec); // Log the loaded spec for debugging
// } catch (error) {
//   console.error('Error loading OpenAPI spec:', error.message);
// }

// Import the database connection function
const { DBConcction } = require('./util/database'); // Destructure the named export

// Environment variables
const port = process.env.PORT || 8080;

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/tasks', tasksRoute);
app.use('/auth', authRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Tasks API!');
});
//const swaggerSpecs = swaggerJsDoc(swaggerOptions);
const openApiSpec = require('./swagger.json'); // Adjust the path if necessary

// Serve Swagger UI with the static OpenAPI spec
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec))
// Serve Swagger UI with the static OpenAPI spec
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

// Start the server
DBConcction(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});