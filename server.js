const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express")
const specs = require("./swaggerConfig")
const app = express();
const port = 5000;
const mintingDB = "mongodb+srv://cytriccecdev:cytricproject0@cluster0.xhct8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/nft", require("./routes/nftRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(mintingDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((error) => console.log("Database connection error", error));