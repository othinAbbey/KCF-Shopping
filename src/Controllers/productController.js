const AuthService = require('../services/authService');

const authController = {
  register: (req, res) => {
    const { username, email, password } = req.body;
    const newUser = AuthService.registerUser(username, email, password);
    res.status(201).json(newUser);
  },
  login: (req, res) => {
    const { email, password } = req.body;
    const user = AuthService.loginUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).send('Invalid credentials');
    }
  },
};

module.exports = authController;
