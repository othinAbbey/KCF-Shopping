// const express = require('express');
// const app = express();
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Import routes and controllers
// const userRoutes = require('./routes/userRoutes');
// const userController = require('./controllers/userController');
// const productRoutes = require('./routes/productRoutes');
// const productController = require('./controllers/productController'); // Import the updated productController

// app.use(express.json());

// // User routes
// app.use('/auth', userRoutes);

// // Product routes
// app.use('/products', productRoutes);

// // User Authentication Endpoints
// app.post('/auth/signup', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const user = await userController.createUser(username, email, password);
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'User creation failed' });
//   }
// });

// app.post('/auth/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const token = await userController.authenticateUser(email, password);
//     if (!token) {
//       res.status(401).json({ error: 'Invalid credentials' });
//     } else {
//       res.json({ token });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });

// // Product Endpoints
// // Assuming you have endpoints for managing products

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });


const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Import routes and controllers
const userRoutes = require('./routes/userRoutes');
const userController = require('./controllers/userController');
const productRoutes = require('./routes/productRoutes');
const productController = require('./controllers/productController'); // Import the updated productController

app.use(express.json());

// User routes
app.use('/auth', userRoutes);

// Product routes
app.use('/products', productRoutes);






// Product Endpoints - Managed via product routes and controllers

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
module.exports = app;