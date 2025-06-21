/**
 * @swagger
 * components:
 *   schemas:
 *     NFT:
 *       type: object
 *       required:
 *         - tokenId
 *         - name
 *         - description
 *         - imageUrl
 *         - owner
 *         - metadataUrl
 *       properties:
 *         tokenId:
 *           type: integer
 *           description: Unique token ID of the NFT
 *         name:
 *           type: string
 *           description: Name of the NFT
 *         description:
 *           type: string
 *           description: Description of the NFT
 *         imageUrl:
 *           type: string
 *           description: URL to the NFT image
 *         owner:
 *           type: string
 *           description: Wallet address of the NFT owner
 *         metadataUrl:
 *           type: string
 *           description: URL to the NFT metadata
 *       example:
 *         tokenId: 1
 *         name: "CryptoArt #1"
 *         description: "A unique piece of digital art."
 *         imageUrl: "https://example.com/nft1.png"
 *         owner: "0x123456789abcdef"
 *         metadataUrl: "https://example.com/metadata/1.json"
 */

const mongoose = require("mongoose");

const NFTSchema = new mongoose.Schema({
  tokenId: { type: Number, unique: true, required: true }, // Store token ID
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { type: String, required: true }, // Store wallet address instead of User reference
  metadataUrl: { type: String, required: true }, // Store the metadata URL from backend
});

module.exports = mongoose.model("NFT", NFTSchema);