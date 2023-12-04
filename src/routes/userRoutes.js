
const express = require('express');
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require('../middlewares/authMiddleware');
const { signup, authenticateUser, loginUser } = require("../Controllers/userController");


// router.get('/', userController.authenticateUser)

// User signup route
// router.post("/signup", async (req, res) => {
//   const { username, email, password, role } = req.body;

//   // Call createUser function with the res object
//   await signup(username, email, password, role, res);
// });

// router.post('/login', userController.login);
router.post('/signup',signup)
router.post('/login',loginUser)


module.exports = router;




