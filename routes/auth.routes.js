const { login, registration, updatePassword } = require("../controller/auth.controller");
const { asyncHandler } = require("../middleware/asynchandler");
const { adminVerify } = require("../middleware/tokenVerify");

const router = require("express").Router();

router.post('/login', asyncHandler(login))
router.post('/create/employee', adminVerify, asyncHandler(registration))
router.post('/password/update', asyncHandler(updatePassword))



module.exports = router;