const express = require("express");
const NFT = require("../models/NFT");
const auth = require("../middleware/auth");

const router = express.Router();

/**

 * @swagger

 * /nft/gallery/{walletAddress}:

 *   get:

 *     summary: Get NFT Gallery by Wallet Address

 *     description: Retrieves a list of NFTs created by the given wallet address

 *     parameters:

 *       - in: path

 *         name: walletAddress

 *         required: true

 *         schema:

 *           type: string

 *         description: Wallet address to retrieve NFTs for

 *     responses:

 *       200:

 *         description: List of NFTs retrieved successfully

 *       404:

 *         description: No NFTs found for this wallet

 */





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

 *     summary: Store NFT Data

 *     description: Stores NFT metadata in the database

 *     requestBody:

 *       required: true

 *       content:

 *         application/json:

 *           schema:

 *             type: object

 *             properties:

 *               nftName:

 *                 type: string

 *               nftDescription:

 *                 type: string

 *               nftLogoUrl:

 *                 type: string

 *               nftId:

 *                 type: integer

 *               userWalletAddress:

 *                 type: string

 *     responses:

 *       201:

 *         description: NFT data stored successfully

 *       400:

 *         description: Invalid request data

 */
router.post("/store", auth, async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    const nft = new NFT({ name, description, imageUrl, owner: req.user.userId });
    await nft.save();

    res.status(201).json({ message: "NFT stored successfully", nft });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

/**

 * @swagger

 * /nft/{nftId}:

 *   get:

 *     summary: Get NFT Data By ID

 *     description: Retrieves NFT data stored under the given ID

 *     parameters:

 *       - in: path

 *         name: nftId

 *         required: true

 *         schema:

 *           type: integer

 *         description: NFT ID to retrieve data for

 *     responses:

 *       200:

 *         description: NFT data retrieved successfully

 *       404:

 *         description: NFT not found

 */
router.get("/:id", async (req, res) => {
  try {
    const nft = await NFT.findById(req.params.id);
    if (!nft) return res.status(404).json({ message: "NFT not found" });

    res.json(nft);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


module.exports = router;