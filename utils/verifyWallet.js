const { ethers } = require("ethers") ;

const verifyWalletSignature = (message, signature, expectedAddress) => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
};

module.exports = verifyWalletSignature;