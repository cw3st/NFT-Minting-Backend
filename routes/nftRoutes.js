/**
 * @swagger
 * tags:
 *   - name: NFT
 *     description: NFT management and minting
 *
 * /nft/store:
 *   post:
 *     summary: Store NFT metadata after wallet signature verification
 *     tags: [NFT]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - imageUrl
 *               - walletAddress
 *               - message
 *               - signature
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the NFT
 *               description:
 *                 type: string
 *                 description: Description of the NFT
 *               imageUrl:
 *                 type: string
 *                 description: URL to the NFT image
 *               walletAddress:
 *                 type: string
 *                 description: Wallet address of the user
 *               message:
 *                 type: string
 *                 description: Message signed by the wallet
 *               signature:
 *                 type: string
 *                 description: Signature from the wallet
 *     responses:
 *       200:
 *         description: NFT metadata stored successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NFT'
 *       400:
 *         description: Missing wallet verification data
 *       401:
 *         description: Invalid wallet signature
 *       500:
 *         description: Internal server error
 *
 * /nft/user/{walletAddress}:
 *   get:
 *     summary: Get all NFTs owned by a specific wallet address
 *     tags: [NFT]
 *     parameters:
 *       - in: path
 *         name: walletAddress
 *         schema:
 *           type: string
 *         required: true
 *         description: Wallet address to fetch NFTs for
 *     responses:
 *       200:
 *         description: List of NFTs owned by the wallet address
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nfts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/NFT'
 *       400:
 *         description: Wallet address is required
 *       500:
 *         description: Internal server error
 */

const express = require ("express");
const verifyWalletSignaturefrom = require("../utils/verifyWallet.js");
const { storeNFTMetadata }  = require("../controllers/nftController.js");
const { getNFTsByWallet }  = require("../controllers/nftController.js");

const router = express.Router();

router.post("/store", async (req, res) => {
  const { name, description, imageUrl, walletAddress, message, signature } = req.body;

  if (!walletAddress || !message || !signature) {
    return res.status(400).json({ error: "Missing wallet verification data" });
  }

  const isValidSignature = verifyWalletSignaturefrom(message, signature, walletAddress);

  if (!isValidSignature) {
    return res.status(401).json({ error: "Invalid wallet signature" });
  }

  try {
    const nftData = await storeNFTMetadata(name, description, imageUrl, walletAddress);
    res.json(nftData);
  } catch (error) {
    console.error("Error storing NFT metadata:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user/:walletAddress", async (req, res) => {
  const { walletAddress } = req.params;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }

  try {
    const nfts = await getNFTsByWallet(walletAddress);
    res.json({ nfts });
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
