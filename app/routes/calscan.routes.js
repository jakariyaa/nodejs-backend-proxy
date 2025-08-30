const multer = require("multer");
const calscanRouter = require("express").Router();
const calscanController = require("../controllers/calscan.controller");

const upload = multer();

calscanRouter.post(
  "/sendData",
  upload.single("image"),
  calscanController.sendData
);

module.exports = calscanRouter;
