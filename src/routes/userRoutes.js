const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// User signup endpoint
router.post('/signup', async (req, res) => {
  const { username, email, password , role} = req.body;

   // Check for missing required fields
   if (!username || !email || !password || !role) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  try {
    const user = await userController.createUser(username, email, password,role);
    res.status(200).json(user); // Assuming successful signup returns 200 status
    // res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

// User login endpoint with authentication
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userController.authenticateUser(email, password);
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.json({ token });
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;




