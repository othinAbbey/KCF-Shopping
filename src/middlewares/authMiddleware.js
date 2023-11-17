const jwt = require('jsonwebtoken');
const secretKey = 12233 

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded token:', decoded);
    req.user = decoded.user;

    
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
