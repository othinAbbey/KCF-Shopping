const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_fallback_secret';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded token:', decoded);
    req.user = decoded.user;

    // Check if the user has the required role
    if (req.user.role !== 'admin') {
      console.error('Error verifying token:', error.message);
      return res.status(403).json({ error: 'Forbidden: Insufficient privileges' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { verifyToken };
