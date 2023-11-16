const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import routes and controllers
const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require("./routes/cartRoutes");
const productController = require('./controllers/productController'); // Import the updated productController

app.use(express.json());

// User routes
app.use('/auth', userRoutes);

// Product routes
app.use('/products', productRoutes);

//Cart routes
app.use('/cart', cartRoutes);

// Product Endpoints - Managed via product routes and controllers

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
module.exports = app;