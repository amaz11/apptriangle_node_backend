const express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser, getProfile } = require('../controller/user.controller');
const { asyncHandler } = require('../middleware/asynchandler');
const { adminVerify, allUserVerify } = require('../middleware/tokenVerify');
const router = express.Router();


router.get('/', adminVerify, asyncHandler(getAllUsers));
router.get('/profile', allUserVerify, getProfile);
router.get('/:id', adminVerify, asyncHandler(getUser));
router.put('/:id', adminVerify, asyncHandler(updateUser));
router.delete('/:id', adminVerify, asyncHandler(deleteUser));

module.exports = router;