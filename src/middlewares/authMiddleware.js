const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { use } = require("../app");
// const secretKey = 12233 


async function getUsers(req, res) {
  const users = await prisma.user.findMany();
  return users
  // res.send(users);
}

const verifyToken = (req, res, next) => {
  const Bearer = req.headers.authorization;
  const token = Bearer.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if(err){
        return res.status(403).json({message: "Access denied. No token provided or invalid token", err});
      } else {
        user = req.user;
        next();
        // res.status(200).json({message: "Success", user})
       //next
      }
    });
    // if (user.role !== 'admin') {
    //   console.log(users)
    //   console.error('Error verifying token:', error.message);
    //   return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    // }

    // next();
  } catch (error) {
    // return res.status(401).json({ error: 'Invalid token' });
  }
};



// const jwt = require('jsonwebtoken');

function createToken (data){
    const token = jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1h'});
    return token;
}



module.exports = {createToken, verifyToken};
