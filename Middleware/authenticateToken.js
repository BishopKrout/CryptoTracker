const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // assuming your payload contains the user id as `id`
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: 'Token is not valid.' });
  }
};

module.exports = authenticateToken;
