const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const saltRounds = 10;
const secretKey = "12233"; 



// creating a new user
// async function createUser(username, email, password, role) {
//   try {
//     // Check if a user with the same email already exists
//     const existingUser = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });

//     if (existingUser) {
//       throw new Error('User with this email already exists');
//     }

//     // Hash the password before storing it in the database
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//         role,
//       },
//     });

//     console.log('User created:', newUser);
//     return newUser;
//   } catch (error) {
//     console.error('Error creating a user:', error.message);
//     throw new Error('Failed to create a user');
//   }
// }

// creating a new user
async function createUser(username, email, password, role, res) {
  try {
    // Check if a user with the same email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });

    console.log('User created:', newUser);
    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating a user:', error.message);
    return res.status(500).json({ error: 'Failed to create a user' });
  }
}



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
    console.log("login successful");
    // console.log('User authenticated:', user);
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
    // console.log('Generated Token:', token);
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
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login failed:', error.message);
    return res.status(500).json({ error: 'Login failed' });
  }
}

module.exports = {
  createUser,
  authenticateUser,
  login
};
