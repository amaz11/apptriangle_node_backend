const express = require('express');
const { asyncHandler } = require('../middleware/asynchandler');
const { createAttendence, getAllAttendences, getALLAttendenceByEmployee, updateAttendence, TodayAttendence } = require('../controller/attendence.controller');
const { commonVerify, adminVerify } = require('../middleware/tokenVerify');
const router = express.Router();

router.post('/', commonVerify, createAttendence);
router.get('/admin/', adminVerify, asyncHandler(getAllAttendences));
router.get('/employee/', commonVerify, asyncHandler(getALLAttendenceByEmployee));
router.get("/user/today/attendence", commonVerify, asyncHandler(TodayAttendence));
router.patch('/', commonVerify, asyncHandler(updateAttendence));

module.exports = router;