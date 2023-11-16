const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { verifyToken } = authMiddleware;

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

router.post('/login', userController.login);

module.exports = router;




