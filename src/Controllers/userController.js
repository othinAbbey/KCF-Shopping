// const userService = require('../services/userService');

// const userController = {
//   signUp: (req, res) => {
//     const { username, email, password } = req.body;
//     const newUser = userService.registerUser(username, email, password);
//     if (newUser.error) {
//       return res.status(400).json({ error: newUser.error });
//     }
//     res.status(201).json(newUser);
//   },

//   login: (req, res) => {
//     const { email, password } = req.body;
//     const user = userService.loginUser(email, password);
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     // Generate and send access token (not implemented here)
//     const accessToken = 'sample_access_token'; // Generate a real token for authentication
//     res.status(200).json({ accessToken, user });
//   }
// };

// module.exports = userController;


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to create a new user
async function createUser(username, email, password) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        // ... other user fields
      }
    });
    return newUser;
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

// Function to find a user by email
async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

// Function to authenticate a user by email and password
async function authenticateUser(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      return null; // User not found
    }

    // Check if the password matches
    if (user.password === password) {
      return user; // Authentication successful
    } else {
      return null; // Incorrect password
    }
  } catch (error) {
    throw error; // Handle error appropriately
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  authenticateUser
  // Add other user-related functions here to handle different operations
};
