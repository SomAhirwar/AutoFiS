const express = require("express");
const MLController = require("../controller/MLController");
const setUpUpload = require("../utility/upload");
const upload = setUpUpload("./public/images");

const router = express.Router();

router.route("/").post(upload.single("image"), MLController.predict);

module.exports = router;
