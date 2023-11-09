const User = require('../models/userModel');

class AuthService {
  // Simulated database or data storage
  users = [];

  registerUser(username, email, password) {
    const id = this.users.length + 1;
    const newUser = new User(id, username, email, password);
    this.users.push(newUser);
    return newUser;
  }

  loginUser(email, password) {
    const user = this.users.find((user) => user.email === email && user.password === password);
    return user;
  }
}

module.exports = new AuthService();
