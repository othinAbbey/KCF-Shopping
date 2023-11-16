const User = require("../models/user");

class UserService {
  constructor() {
    this.users = [];
  }

  registerUser(username, email, password) {
    // Check for existing user with the same email
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      return { error: 'Email already in use' };
    }

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

module.exports = new UserService();
