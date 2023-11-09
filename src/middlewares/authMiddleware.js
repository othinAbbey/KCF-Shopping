// authMiddleware.js

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming token is in the request headers

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
