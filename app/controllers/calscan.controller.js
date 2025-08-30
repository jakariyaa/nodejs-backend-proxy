const crypto = require("crypto");
const axios = require("axios");
const FormData = require("form-data");
const { CRYPTO_SHARED_SECRET, CALSCAN_WEBHOOK_URL } = require("../configs/env");

const sendData = async (req, res, next) => {
  try {
    const metaString = req.body.meta;
    const signature = req.headers["x-signature"];

    if (!metaString || !signature) {
      return res
        .status(400)
        .json({ success: false, msg: "Missing meta or signature" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", CRYPTO_SHARED_SECRET)
      .update(metaString)
      .digest("hex");

    const valid = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
    if (!valid) return res.status(401).json({ msg: "Invalid signature" });

    const file = req.file;

    const formData = new FormData();
    formData.append("image", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const response = await axios.post(CALSCAN_WEBHOOK_URL, formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendData,
};
