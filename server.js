const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;
const mintingDB = "mongodb://localhost:27017/NFT_Minting";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(mintingDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection error", error));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/nft", require("./routes/nftRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});