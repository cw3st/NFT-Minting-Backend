const express = require ("express");
const verifyWalletSignaturefrom = require("../utils/verifyWallet.js");
const storeNFTMetadata  = require("../controllers/nftController.js");

const router = express.Router();

router.post("/store", async (req, res) => {
  const { name, description, imageUrl, walletAddress, message, signature } = req.body;

  // if (!walletAddress || !message || !signature) {
  //   return res.status(400).json({ error: "Missing wallet verification data" });
  // }

  // const isValidSignature = verifyWalletSignaturefrom(message, signature, walletAddress);

  // if (!isValidSignature) {
  //   return res.status(401).json({ error: "Invalid wallet signature" });
  // }

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
