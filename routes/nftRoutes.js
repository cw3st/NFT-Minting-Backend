const express = require("express");
const NFT = require("../models/NFT");
const auth = require("../middleware/auth");

const router = express.Router();

// Get All NFTs (Public)
router.get("/gallery", async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.json(nfts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Store NFT (Protected)
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

// Get NFT by ID
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