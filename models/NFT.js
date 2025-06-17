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