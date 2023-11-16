const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
// const saltRounds = 10;
const secretKey = process.env.JWT_SECRET; // Replace with a secure secret key

// creating a new user
async function createUser(username, email, password,role) {
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role,
      }
    });
    console.log('User created:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error creating a user:', error.message);
    throw new Error('Failed to create a user');
  }
}

// Finding a user by email
async function findUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    return user;
  } catch (error) {
    throw error;
  }
}

// Authenticating a user using email and password with bcrypt and jwt
// async function authenticateUser(email, password) {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email,
//         password
//       }
//     });

//     if (!user) {
//       return null; // if No User is found
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return null; // Incorrect password
//     }

//     const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
//     return token;
//   } catch (error) {
//     console.log('Error authenticating user:', error.message);
//     res.status(500).json({ error: 'Login failed. Please try again later.' });
//     // throw error; // Handle error appropriately
//   }
// }

// module.exports = {
//   createUser,
//   findUserByEmail,
//   authenticateUser
//   // Add other user-related functions here to handle different operations
// };

// Authenticating a user using email and password with bcrypt and jwt
async function authenticateUser(email, password) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null; // if No User is found
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null; // Incorrect password
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    throw new Error('Login failed. Please try again later.');
  }
}

module.exports = {
  createUser,
  findUserByEmail,
  authenticateUser,
  // Add other user-related functions here to handle different operations
};
