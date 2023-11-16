const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const saltRounds = 10;
const secretKey = process.env.JWT_SECRET; // Replace with a secure secret key

// creating a new user
async function createUser(username, email, password,role) {
  try {
     // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
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
    // console.log('User:', user )
    // console.log('Password:', password);
    // console.log('User password', user.password)
    // console.log('Hashed Password:', user.hashedPassword);
    // console.log('Password Match:', passwordMatch);
    if (!passwordMatch) {
      return null; // Incorrect password
    
  }
  console.log('User ID:', user.id);
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
  console.log('Generated Token:', token);
  return token;

    
  } catch (error) {
    console.error('Error authenticating user:', error.message);
    throw new Error('Login failed. Please try again later.');
  }

  
  
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const token = await authenticateUser(email, password);
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
    } else {
      res.json({ message: 'Login successful', token });
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    res.status(500).json({ error: 'Login failed' });
  }
}
module.exports = {
  createUser,
  findUserByEmail,
  authenticateUser,
  login
  // Add other user-related functions here to handle different operations
};
