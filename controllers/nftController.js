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
// const storeNFTMetadata = async (name, description, imageUrl, walletAddress) => {
//   if (!name || !description || !imageUrl || !walletAddress) {
//     throw new Error("Missing required NFT metadata fields.");
//   }

//   // Generate a unique tokenId (UUID)
//   const tokenId = uuidv4();

//   // Create and save the NFT in the database
//   const nft = new NFT({
//     tokenId,
//     name,
//     description,
//     imageUrl,
//     walletAddress,
//     metadataUrl: `https://example.com/metadata/${tokenId}.json`,
//   });

//   await nft.save();

//   return {
//     tokenId,
//     metadataUrl: nft.metadataUrl,
//   };
// };

const storeNFTMetadata = async (name, description, imageUrl, walletAddress) => {
    try {
      // Generate a unique token ID (if not using blockchain yet)
      const tokenId = Math.floor(Math.random() * 1000000); // Temporary random ID
  
      // Simulate storing metadata (Replace with DB storage if needed)
      const nft = new NFT({
      tokenId,
      name,
      description,
      imageUrl,
      owner: walletAddress,
      metadataUrl: `mongodb+srv://cytriccecdev:cytricproject0@cluster0.xhct8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    });
    await nft.save();

      return { tokenId, metadataUrl: nft.metadataUrl };
    } catch (error) {
      console.error("Error storing NFT metadata:", error);
      throw error;
    }
  };


const getNFTsByWallet = async (walletAddress) => {
    return await NFT.find({ owner: walletAddress });
};  

module.exports = { storeNFTMetadata, getNFTsByWallet };