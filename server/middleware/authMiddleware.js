const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  // Extract the token from the Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  });
};
