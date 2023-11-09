const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await userController.signUp(username, email, password);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userController.login(email, password);
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.json({ token });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
