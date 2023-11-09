const userService = require('../services/userService');

const userController = {
  signUp: (req, res) => {
    const { username, email, password } = req.body;
    const newUser = userService.registerUser(username, email, password);
    if (newUser.error) {
      return res.status(400).json({ error: newUser.error });
    }
    res.status(201).json(newUser);
  },

  login: (req, res) => {
    const { email, password } = req.body;
    const user = userService.loginUser(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate and send access token (not implemented here)
    const accessToken = 'sample_access_token'; // Generate a real token for authentication
    res.status(200).json({ accessToken, user });
  }
};

module.exports = userController;
