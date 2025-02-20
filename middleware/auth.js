const jwt = require("jsonwebtoken");

module.exports = function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store user info in request object
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid token" });
  }
};
