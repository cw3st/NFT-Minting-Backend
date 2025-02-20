const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**

 * @swagger

 * /auth/register:

 *   post:

 *     summary: Register a new user

 *     description: Creates a new user account with hashed password

 *     requestBody:

 *       required: true

 *       content:

 *         application/json:

 *           schema:

 *             type: object

 *             properties:

 *               username:

 *                 type: string

 *               email:

 *                 type: string

 *               password:

 *                 type: string

 *     responses:

 *       201:

 *         description: User registered successfully

 *       400:

 *         description: Email already exists

 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, walletAddress } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password, walletAddress });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


/**

 * @swagger

 * /auth/login:

 *   post:

 *     summary: User login

 *     description: Authenticates user and returns JWT token

 *     requestBody:

 *       required: true

 *       content:

 *         application/json:

 *           schema:

 *             type: object

 *             properties:

 *               email:

 *                 type: string

 *               password:

 *                 type: string

 *     responses:

 *       200:

 *         description: User logged in successfully, returns JWT token

 *       400:

 *         description: Invalid credentials

 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "7d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;