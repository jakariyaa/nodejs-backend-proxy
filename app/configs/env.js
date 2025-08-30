require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  CALSCAN_WEBHOOK_URL: process.env.CALSCAN_WEBHOOK_URL,
  CRYPTO_SHARED_SECRET: process.env.CRYPTO_SHARED_SECRET,
};
