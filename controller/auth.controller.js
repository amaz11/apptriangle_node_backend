const prisma = require("../db/db")
const ErrorHandler = require("../utils/erroHandeler")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// const usersWithoutPasswords = await prisma.user.findMany({
//     omit: { password: true },
//   });
exports.login = async (req, res, next) => {
    const user = await prisma.users.findUniqueOrThrow({
        where: {
            email: req.body.email,
        },
    })

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return next(new ErrorHandler('Invalid credentials', 400));

    const token = jwt.sign({ id: user.id, role: user.role, position: user.position }, process.env.JWT_SECRET, { expiresIn: '1h' });

    user.password = ""
    res.status(200).json({ data: user, message: 'success', ok: true, token })
}

exports.registration = async function (req, res, next) {
    if (req.body.email === "" || req.body.phone === "") {
        return next(new ErrorHandler("Fill The Form", 400))
    }
    const hashedPassword = await bcrypt.hash(req.body.phone, 10);

    const user = await prisma.users.create({
        omit: { password: true },
        data: {
            ...req.body,
            password: hashedPassword

        }
    })

    // TODO: Send a email notification
    res.status(201).json({ data: user, message: 'success', ok: true })
}

exports.updatePassword = async (req, res, next) => {
    const user = await prisma.users.findUniqueOrThrow({
        where: {
            id: +req.user.id,
        },
    })
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) return next(new ErrorHandler('Invalid credentials', 400));

    if (req.body.newPassword !== req.body.confirmPassword) return next(new ErrorHandler('password not match', 400));

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    await prisma.users.update({
        where: {
            id: user.id,
        },
        data: {
            password: hashedPassword
        }
    })

    res.status(200).json({ message: 'success', ok: true, token })
}


//TODO: forgot password

// const user = await prisma.users.create({
//     omit: { password: true },
//     data: {
//         email: 'amaz3@gmail.com',
//         name: 'amaz',
//         password: '123456',
//         address: 'fsdfsdfsdfsfd',
//         // phone: '1234560000',
//         position: 'Head',
//         role: 'ADMIN',
//     }
// })