const prisma = require("../db/db");
const ErrorHandler = require("../utils/erroHandeler")

const AttendenceType = {
    EARLY: 'EARLY',
    LATE: 'LATE',
    ONTIME: 'ONTIME'
};

function checkInType(checkInTime) {
    const officialCheckIn = new Date(checkInTime);
    officialCheckIn.setHours(10, 0, 0, 0); // 10:00 AM
    const lateThreshold = new Date(officialCheckIn.getTime() + 15 * 60000); // 10:15 AM

    if (checkInTime < officialCheckIn) {
        return AttendenceType.EARLY;
    } else if (checkInTime > lateThreshold) {
        return AttendenceType.LATE;
    } else {
        return AttendenceType.ONTIME;
    }
}

function checkOutType(checkOutTime) {
    const officialCheckOut = new Date(checkOutTime);
    officialCheckOut.setHours(18, 0, 0, 0); // 6:00 PM
    const earlyThreshold = new Date(officialCheckOut.getTime() - 15 * 60000); // 5:45 PM

    if (checkOutTime < earlyThreshold) {
        return AttendenceType.EARLY;
    } else if (checkOutTime > officialCheckOut) {
        return AttendenceType.LATE;
    } else {
        return AttendenceType.ONTIME;
    }
}

exports.createAttendence = async (req, res) => {
    const { id } = req.user
    const { checkInHour, checkInMinutes, lat, lon } = req.body

    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
    const getLocation = await response.json()
    const location = `${getLocation?.address?.house_number} ${getLocation?.address?.road}, ${getLocation?.address?.quarter}, ${getLocation?.address?.suburb}, ${getLocation?.address?.city}`

    let date = new Date().toISOString().split('T')[0]
    const findAttendence = await prisma.attendence.findMany({
        where: {
            date,
            userID: +id,
        }
    })
    if (findAttendence.length > 0) {
        return res.status(201).json({
            ok: true,
            message: 'success',
        })

    }
    const checkInTime = new Date();
    checkInTime.setHours(checkInHour, checkInMinutes, 0, 0);
    const checkIn = checkInType(checkInTime);
    const attendence = await prisma.attendence.create({
        data: {
            location,
            date,
            checkInTime,
            checkIn,
            userID: +id
        }
    })


    res.status(201).json({
        ok: true,
        message: 'success',
        data: attendence
    })
};

//employee
exports.TodayAttendence = async (req, res) => {
    const { id } = req.user
    let date = new Date().toISOString().split('T')[0];
    let day = date.getDate();
    const attendece = await prisma.attendence.findUnique({
        where: {
            userID: +id,
            date: day
        }
    })
    res.status(200).json({ message: "success", ok: true, data: attendece })
}

// admin
exports.getAllAttendences = async (req, res) => {
    const attendence = await prisma.attendence.findMany({
        include: {
            user: {
                omit: { password: true }
            }
        }

    })

    res.status(200).json({
        ok: true,
        message: 'success',
        data: attendence
    })
};

// employee
exports.getALLAttendenceByEmployee = async (req, res) => {
    const { id } = req.user
    const attendence = await prisma.attendence.findMany({
        where: {
            userID: +id,
        }
    })

    res.status(200).json({
        ok: true,
        message: 'success',
        data: attendence
    })
};

exports.updateAttendence = async (req, res, next) => {
    const { checkOutHour, checkOutMinutes } = req.body;
    const { id } = req.user

    let date = new Date().toISOString().split('T')[0]
    const checkOutTime = new Date();
    checkOutTime.setHours(checkOutHour, checkOutMinutes, 0, 0);
    const checkOut = checkOutType(checkOutTime);
    const findAttendence = await prisma.attendence.findMany({
        where: {
            date,
            userID: +id
        }
    })
    if (findAttendence.length > 0) {
        const attendence = await prisma.attendence.update({
            where: {
                id: findAttendence[0].id
            },
            data: {
                checkOutTime: checkOutTime,
                checkOut: checkOut
            }
        });
        return res.status(200).json({
            ok: true,
            message: 'Check-out recorded successfully',
            data: attendence
        });
    }
    return next(new ErrorHandler("No check-in found for today", 400))

}