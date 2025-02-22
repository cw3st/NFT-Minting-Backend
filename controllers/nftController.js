const { v4: uuidv4 } = require("uuid"); // Generates unique token IDs
const NFT = require("../models/NFT.js");

/**
 * Stores NFT metadata in the database
 * @param {string} name
 * @param {string} description
 * @param {string} imageUrl
 * @param {string} walletAddress
 * @returns {object} Stored NFT data
 */
const storeNFTMetadata = async (name, description, imageUrl, walletAddress) => {
  if (!name || !description || !imageUrl || !walletAddress) {
    throw new Error("Missing required NFT metadata fields.");
  }

  // Generate a unique tokenId (UUID)
  const tokenId = uuidv4();

  // Create and save the NFT in the database
  const nft = new NFT({
    tokenId,
    name,
    description,
    imageUrl,
    walletAddress,
    metadataUrl: `https://example.com/metadata/${tokenId}.json`,
  });

  await nft.save();

  return {
    tokenId,
    metadataUrl: nft.metadataUrl,
  };
};

module.exports = { storeNFTMetadata };