# NFT Minting Backend

This project provides a backend API for minting, storing, and managing NFTs (Non-Fungible Tokens). It is designed to be simple, secure, and easy to use for both developers and non-developers.

---

## Features

- **NFT Minting & Storage:** Store NFT metadata securely after verifying wallet ownership.
- **Wallet Verification:** Ensures only the wallet owner can mint or manage NFTs.
- **NFT Retrieval:** Fetch all NFTs owned by a specific wallet address.
- **JWT Authentication:** Secure protected routes using JSON Web Tokens.
- **Swagger API Docs:** Interactive documentation for all API endpoints.

---

## How It Works

1. **User signs a message** with their crypto wallet.
2. **Backend verifies** the signature to confirm wallet ownership.
3. **NFT metadata is stored** in the database.
4. **Users can fetch** their NFTs by wallet address.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- A crypto wallet (e.g., MetaMask) for testing

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/NFT-Minting-Backend.git
   cd NFT-Minting-Backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add the following:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Start the server:**
   ```sh
   npm start
   ```

---

## API Documentation

Interactive API docs are available at:  
`http://localhost:3000/api-docs`

You can test all endpoints and see example requests and responses.

---

## Main Endpoints

- **POST `/nft/store`**  
  Store NFT metadata after verifying wallet signature.

- **GET `/nft/user/{walletAddress}`**  
  Get all NFTs owned by a specific wallet address.

---

## Project Structure

- `models/` — Database models (e.g., NFT)
- `routes/` — API route definitions
- `controllers/` — Business logic for each route
- `middleware/` — Authentication and other middleware
- `utils/` — Utility functions (e.g., wallet verification)
- `swagger/` — Swagger documentation setup

---

## For Developers

- All endpoints are documented with Swagger.
- Code is modular and easy to extend.
- JWT authentication is used for protected routes.

---

## For Non-Developers

- You can use the API to mint and view NFTs without needing to understand the code.
- The API docs provide step-by-step instructions and examples.

---

## License

MIT

---

## Questions?

Open an issue or contact the maintainer for help!