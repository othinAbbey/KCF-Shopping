// const express = require('express');
// const app = express();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const cors = require('cors');

// // Import routes and controllers
// const userRoutes = require("./routes/userRoutes");
// const userController = require("./Controllers/userController");
// const productRoutes = require("./routes/productRoutes");
// const cartRoutes = require("./routes/cartRoutes");
// const productController = require("./Controllers/productController"); // Import the updated productController

// app.use(express.json());

// // User routes
// app.use('/auth', userRoutes);

// // Product routes
// app.use('/products', productRoutes);

// //Cart routes
// app.use('/cart', cartRoutes);

// // Use CORS middleware with specific options
// const corsOptions = {
//   origin: 'http://localhost:8000',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // enable credentials (cookies, etc.)
//   optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

// // Product Endpoints - Managed via product routes and controllers

// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });
// module.exports = app;

const express = require('express');
const cors = require('cors'); // Import cors module

const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import routes and controllers
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use(express.json());
app.use(cors()); // Use cors middleware

// User routes
app.use('/auth', userRoutes);

// Product routes
app.use('/products', productRoutes);

// Cart routes
app.use('/cart', cartRoutes);

// Product Endpoints - Managed via product routes and controllers


// Use CORS middleware with specific options
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable credentials (cookies, etc.)
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
