const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const saltRounds = 10;
const secretKey = 'your-secret-key'; // Replace with a secure secret key

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

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null; // Incorrect password
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return token;
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
