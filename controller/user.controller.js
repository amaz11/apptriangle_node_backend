const prisma = require("../db/db");


exports.getAllUsers = async (req, res) => {
    const query = req.query;
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 2;
    const search = query.search || "";
    const skip = (page - 1) * limit;
    let total, users;

    if (search) {
        total = await prisma.users.count({
            where: {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { phone: { contains: search, mode: "insensitive" } },
                    { position: { contains: search, mode: "insensitive" } },
                    { address: { contains: search, mode: "insensitive" } },
                ],
            },
        });

        users = await prisma.users.findMany({
            where: {
                OR: [
                    { name: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } },
                    { phone: { contains: search, mode: "insensitive" } },
                    { position: { contains: search, mode: "insensitive" } },
                    { address: { contains: search, mode: "insensitive" } },
                ],
            },
            skip: skip,
            take: limit,
            omit: {
                password: true
            }
        });
    } else {
        total = await prisma.users.count();
        users = await prisma.users.findMany({
            skip,
            take: limit,
            omit: {
                password: true
            }
        });


    }

    res.status(200).json({
        ok: true,
        message: 'success',
        data: users,
        total,
        skip,
        limit,
        currentPage: page
    });
};

exports.getAllUser = async (req, res) => {
    const users = await prisma.users.findMany({
        omit: {
            password: true
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: users,

    });
};

exports.getUser = async (req, res) => {
    const { id } = req.params;

    const user = await prisma.users.findUniqueOrThrow({
        where: { id: +id },
        omit: { password: true }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: user
    });
};

exports.getProfile = async (req, res) => {
    const { id } = req.user;
    const user = await prisma.users.findUniqueOrThrow({
        where: { id: +id },
        omit: { password: true }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: user
    });
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, phone, position, role, image } = req.body;

    const user = await prisma.users.update({
        where: { id: +id },
        data: {
            name,
            email,
            address,
            phone,
            position,
            role,
            image,
        }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
        data: user
    });

};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    await prisma.users.delete({
        where: { id: +id }
    });

    res.status(200).json({
        ok: true,
        message: 'success',
    });
};