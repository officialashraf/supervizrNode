const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Expecting the token in the Authorization header

  if (!authHeader) {
    return res.json({ status: false, message: 'No token provided' });
  }

  // Split the "Bearer" part from the token
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.json({ status: false, message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.json({ status: false, message: 'Failed to authenticate token' });
    }

    // If everything is good, save the decoded information to the request for use in other routes
    req.userId = decoded.userId;
    req.username = decoded.username;
    next(); // Pass control to the next middleware or route handler
    
  });
};

module.exports = verifyToken;
