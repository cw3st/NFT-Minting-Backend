const express = require("express");
const NFT = require("../models/NFT");
const authenticateToken = require("../middleware/auth"); // JWT Middleware
const { storeMetadata, checkId } = require("../utils/nftUtils"); // Utility functions

const router = express.Router();

/**
 * @swagger
 * /nft/gallery:
 *   get:
 *     summary: Get NFT Gallery
 *     description: Retrieves a list of all NFTs
 *     responses:
 *       200:
 *         description: List of NFTs retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/gallery", async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.json(nfts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * @swagger
 * /nft/store:
 *   post:
 *     summary: Store NFT Metadata
 *     description: Stores NFT metadata in the database
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       201:
 *         description: NFT metadata stored successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post("/store", authenticateToken, async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const owner = req.user.walletAddress; // Extracted from JWT

    if (!name || !description || !imageUrl || !owner) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate a unique tokenId
    let tokenId;
    let exists = true;
    while (exists) {
      tokenId = Math.floor(Math.random() * 1000000); // Generate a random ID
      exists = await checkId(tokenId); // Check if tokenId exists on-chain
    }

    // Store metadata and get metadata URL
    const metadataUrl = await storeMetadata(tokenId, name, description, imageUrl);

    // Store NFT data in the database
    const newNFT = new NFT({
      tokenId,
      name,
      description,
      imageUrl,
      owner, // Wallet address
      metadataUrl,
    });

    await newNFT.save();

    res.status(201).json({
      success: true,
      message: "NFT metadata stored successfully",
      tokenId,
      metadataUrl,
    });
  } catch (error) {
    console.error("Error storing NFT metadata:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /nft/{tokenId}:
 *   get:
 *     summary: Get NFT Metadata by ID
 *     description: Retrieves stored NFT metadata using the token ID
 *     parameters:
 *       - in: path
 *         name: tokenId
 *         required: true
 *         schema:
 *           type: integer
 *         description: NFT ID to retrieve data for
 *     responses:
 *       200:
 *         description: NFT metadata retrieved successfully
 *       404:
 *         description: NFT not found
 */
router.get("/:tokenId", async (req, res) => {
  try {
    const nft = await NFT.findOne({ tokenId: req.params.tokenId });
    if (!nft) return res.status(404).json({ message: "NFT not found" });

    res.json(nft);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/**
 * @swagger
 * /nft/user:
 *   get:
 *     summary: Get NFTs Owned by the User
 *     description: Retrieves NFTs owned by the authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of NFTs retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/user", authenticateToken, async (req, res) => {
  try {
    const owner = req.user.walletAddress; // Extracted from JWT
    const userNFTs = await NFT.find({ owner });

    res.json({ success: true, nfts: userNFTs });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
