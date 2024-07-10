const prisma = require("../db/db")
const ErrorHandler = require("../utils/erroHandeler")
const holidays = require("date-holidays")

function getAllDatesBetween(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    const stopDate = new Date(endDate);

    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
}
exports.createLeaves = async (req, res) => {
    const { type, reason, file, dayStart, dayEnd } = req.body
    const { id } = req.user
    const hd = new holidays('BD')
    const getHoliday = hd.getHolidays()
    const dates = getAllDatesBetween(dayStart, dayEnd);
    const weekend = []
    for (item in dates) {
        const day = dates[item].getDay();
        const isHoliday = hd.isHoliday(dates[item])

        if (day === 5 || day === 6 || isHoliday) {
            weekend.push(day)
        }
    }

    const leavedays = dates.length - weekend.length
    const leave = await prisma.leaves.create({
        data: {
            file,
            reason,
            type,
            dayStart: dates[0],
            dayEnd: dates[dates.length - 1],
            dayCount: dates.length,
            leaveDays: leavedays,
            applicantID: +id,
        }
    })
    res.status(201).json({
        ok: true,
        message: 'success',
        data: leave
    });

};

// for admin
exports.getAllLeaves = async (req, res) => {
    const leaves = await prisma.leaves.findMany({
        include: {
            applicant: {
                omit: {
                    password: true
                }
            }
        }
    })
    res.status(200).json({
        ok: true,
        message: 'success',
        data: leaves
    });
};
// for team leader 
exports.getAllLeavesForTeamLeader = async (req, res) => {
    const { id } = req.user
    const leaves = await prisma.leaves.findMany({
        include: {
            applicant: {
                omit: {
                    password: true
                },
                include: {
                    Team: {
                        where: {
                            teamheadID: +id
                        }
                    }
                }
            }
        }
    })
    res.status(200).json({
        ok: true,
        message: 'success',
        data: leaves,
    });
};

// get employee leaves  
exports.getLeavesForEmployee = async (req, res) => {
    const { id } = req.user
    const leaves = await prisma.leaves.findMany({
        where: {
            applicantID: +id
        }
    })

    res.status(200).json({
        ok: true,
        message: 'success',
        data: leaves,
    });
};



exports.updateLeaves = async (req, res, next) => {
    const findLeave = await prisma.leaves.findUniqueOrThrow({
        where: {
            id: +req.params.id
        }
    })

    if (findLeave.status === "ACCEPTED" || findLeave.status === "REJECTED" || findLeave.adminStatus === "ACCEPTED" || findLeave.adminStatus === "REJECTED") {
        return next(new ErrorHandler("You can't update the leave any more", 400))
    }
    const leave = await prisma.leaves.update({
        where: {
            id: +req.params.id,
            applicantID: +req.user.id
        },
        data: {
            ...req.body,
        }
    })

    res.status(200).json({
        ok: true,
        message: 'success',
        data: leave
    })
};

// Update function for admin 
exports.updateLeavesStatusByAdmin = async (req, res, next) => {
    const { adminStatus, noteAdmin } = req.body;
    const leave = await prisma.leaves.update({
        where: {
            id: +req.params.id,
        },
        data: {
            adminStatus,
            noteAdmin
        }
    })
    console.log(leave);
    res.status(200).json({
        ok: true,
        message: 'success',
        data: leave
    })
};

// Update function for Team Leader 
exports.updateLeavesStatusByTeamLeader = async (req, res) => {
    const { status, noteHead } = req.body;

    const leave = await prisma.leaves.update({
        where: {
            id: +req.params.id,
        },
        data: {
            status,
            noteHead
        }
    })

    res.status(200).json({
        ok: true,
        message: 'success',
        data: leave
    })
}

exports.deleteLeaves = async (req, res) => {
    const findLeave = await prisma.leaves.findUniqueOrThrow({
        where: {
            id: +req.params.id
        }
    })

    if (findLeave.status === "ACCEPTED" || findLeave.status === "REJECTED" || findLeave.adminStatus === "ACCEPTED" || findLeave.adminStatus === "REJECTED") {
        return next(new ErrorHandler("You can't Delete the leave any more", 400))
    }
    await prisma.leaves.delete({
        where: {
            id: +req.params.id,
            applicantID: +req.user.id
        }
    })
    res.status(200).json({
        ok: true,
        message: 'success',
    });
};