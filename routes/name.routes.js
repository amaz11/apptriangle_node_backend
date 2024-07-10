const express = require('express');
const { asyncHandler } = require('../middleware/asynchandler');
const router = express.Router();

router.post('/', asyncHandler());
router.get('/', asyncHandler());
router.get('/:id', asyncHandler());
router.put('/:id', asyncHandler());
router.delete('/:id', asyncHandler());

module.exports = router;