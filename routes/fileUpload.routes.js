const express = require('express');
const { asyncHandler } = require('../middleware/asynchandler');
const uploadImgs = require("../utils/fileUpload");
const { imageFilePath } = require('../controller/fileUpload.controller');
const router = express.Router();

router.post('/image', uploadImgs.single('image'), asyncHandler(imageFilePath));

module.exports = router;