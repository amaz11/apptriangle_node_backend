const express = require('express');
const { createTeam, getAllTeams, getTeam, updateTeam, deleteTeam, getAllTeamsTeamLead, getAllTeamsEmployee } = require('../controller/team.controller');
const { asyncHandler } = require('../middleware/asynchandler');
const { adminVerify, teamLeadVerify, commonVerify } = require('../middleware/tokenVerify');

const router = express.Router();

router.post('/', adminVerify, asyncHandler(createTeam));
router.get('/', adminVerify, asyncHandler(getAllTeams));
router.get('/team/leader', teamLeadVerify, asyncHandler(getAllTeamsTeamLead));
router.get('/employee', commonVerify, asyncHandler(getAllTeamsEmployee));
router.get('/:id', adminVerify, asyncHandler(getTeam));
router.put('/:id', adminVerify, asyncHandler(updateTeam));
router.delete('/:id', adminVerify, asyncHandler(deleteTeam));

module.exports = router;