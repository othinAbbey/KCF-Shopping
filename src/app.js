const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

// Import routes and controllers
const userRoutes = require("./routes/userRoutes");
const userController = require("./Controllers/userController");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productController = require("./Controllers/productController"); // Import the updated productController

app.use(express.json());

// User routes
app.use('/auth', userRoutes);

// Product routes
app.use('/products', productRoutes);

//Cart routes
app.use('/cart', cartRoutes);

// Use CORS middleware with specific options
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // enable credentials (cookies, etc.)
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// Product Endpoints - Managed via product routes and controllers

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
module.exports = app;