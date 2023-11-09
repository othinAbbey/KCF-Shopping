const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userRoutes = require('./routes/userRoutes'); // Update to the correct path
const userController = require('./controllers/userController'); // Import the userController

app.use(express.json());
app.use('/auth', userRoutes); // Set the base URL for authentication routes

// Routes for user authentication (example: signup and login)
app.post('/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await userController.createUser(username, email, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userController.authenticateUser(email, password);
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
