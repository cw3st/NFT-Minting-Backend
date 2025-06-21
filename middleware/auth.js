/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /protected-route:
 *   get:
 *     summary: Example of a protected route using JWT authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Access granted
 *       401:
 *         description: Access denied. No token provided.
 *       403:
 *         description: Invalid token
 */

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
