const express = require('express');
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware');
const { verifyToken } = authMiddleware;
const { createUser } = require("../Controllers/userController");


// User signup route
router.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;

  // Call createUser function with the res object
  await createUser(username, email, password, role, res);
});

router.post('/login', userController.login);

module.exports = router;




