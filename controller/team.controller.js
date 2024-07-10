const prisma = require("../db/db");


exports.createTeam = async (req, res) => {
    const { name, teamheadID, memberIDs } = req.body;
    const team = await prisma.team.create({
        data: {
            name,
            teamheadID: +teamheadID,
            members: {
                connect: memberIDs.map(id => ({ id: +id }))
            }
        }
    })
    res.status(201).json({
        ok: true,
        message: 'success',
        data: team
    });
};

exports.getAllTeams = async (req, res) => {
    const teams = await prisma.team.findMany({
        include: {
            teamhead: {
                omit: { password: true }
            },
            members: {
                omit: { password: true }
            },
            _count: true
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: teams
    });
};

// GET ALL TEAM FOR TEAMLEAD
exports.getAllTeamsTeamLead = async (req, res) => {
    const { id } = req.user
    const teams = await prisma.team.findMany({
        where: {
            teamheadID: +id,
        },
        include: {
            teamhead: {
                omit: { password: true }
            },
            members: {
                omit: { password: true }
            },
            _count: true
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: teams
    });
};

// GET ALL TEAM FOR EMPLOYER
exports.getAllTeamsEmployee = async (req, res) => {
    const { id } = req.user
    const teams = await prisma.team.findMany({
        include: {
            teamhead: {
                omit: { password: true }
            },
            members: {
                omit: { password: true },
                where: {
                    id: +id
                }

            },
            _count: true
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: teams
    });
};

exports.getTeam = async (req, res) => {
    const { id } = req.params;

    const team = await prisma.team.findUniqueOrThrow({
        where: { id: +id },
        include: {
            teamhead: {
                omit: { password: true }
            },
            members: {
                omit: { password: true }
            }
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: team
    });
};

exports.updateTeam = async (req, res) => {
    const { id } = req.params;
    const { name, teamheadID, memberIDs } = req.body;

    await prisma.team.findUniqueOrThrow({
        where: { id: +id },
    })

    const team = await prisma.team.update({
        where: { id: +id },
        data: {
            name,
            teamheadID: +teamheadID,
            members: {
                set: memberIDs.map(id => ({ id: +id }))
            }
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: team
    });
};

exports.deleteTeam = async (req, res) => {
    const { id } = req.params;

    await prisma.team.delete({
        where: { id: +id }
    });

    res.status(200).json({
        ok: true,
        message: 'success'
    });
};