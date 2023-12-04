const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const { hash } = require('bcrypt');
const { createToken } = require("../middlewares/authMiddleware");
const prisma = new PrismaClient();
const saltRounds = 10;


// creating a new user
async function signup(req, res) {
  console.log('Received request body:', req.body);
  const { username, email, password, role } = req.body;

  try {
    // Check if the user with the given email already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created:', newUser);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating a user:', error.message);
    res.status(500).json({ error: 'Failed to create a user' });
  }
}

// async function authenticateUser(req, res){
//   const users = await prisma.users.findMany();
//   res.send(users)
// }

async function loginUser(req, res){
  //user inputs a username and password
  let userDetails = req.body;

  //find the user in the database
  try {
    const user = await prisma.user.findUnique({
      where:{
        email: userDetails.email,
      }
    })

    //if statements that return errors if the user is not found or the password is incorrect
    if(user && (await bcrypt.compare(userDetails.password, user.password))){
      //if the user is found and the password is correct, generate a token and send it to the user
      const token = createToken({
        id: user.id,
        username: user.username,
        // role: user.role,
      });
      res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(404).json({ message: "Invalid credentials" });
       }
  } catch (error) {
    console.error('Login failed:', error.message);
    return res.status(500).json({ error: 'Login failed' });
  }
}




// module.exports = {
//   createUser,
//   authenticateUser,
//   login
// };

module.exports = {
  signup,
  // authenticateUser,
  loginUser
};
