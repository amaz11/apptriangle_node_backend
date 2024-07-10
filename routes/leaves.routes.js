const express = require('express');
const { asyncHandler } = require('../middleware/asynchandler');
const { createLeaves, getAllLeaves, updateLeaves, deleteLeaves, getAllLeavesForTeamLeader, updateLeavesStatusByAdmin, getLeavesForEmployee, updateLeavesStatusByTeamLeader } = require('../controller/leaves.controller');
const { commonVerify, adminVerify, teamLeadVerify } = require('../middleware/tokenVerify');
const router = express.Router();

router.post('/', commonVerify, createLeaves);
router.get('/', adminVerify, asyncHandler(getAllLeaves));
router.get('/team/leader', teamLeadVerify, asyncHandler(getAllLeavesForTeamLeader));
router.get('/user', commonVerify, asyncHandler(getLeavesForEmployee));
router.put('/:id', commonVerify, asyncHandler(updateLeaves));
router.patch('/admin/:id', adminVerify, asyncHandler(updateLeavesStatusByAdmin))
router.patch('/team/leader/:id', teamLeadVerify, asyncHandler(updateLeavesStatusByTeamLeader))
router.delete('/:id', commonVerify, asyncHandler(deleteLeaves));

module.exports = router;