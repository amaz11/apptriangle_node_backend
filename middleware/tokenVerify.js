const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/erroHandeler');

exports.employeeVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(token);
    if (!token) return next(new ErrorHandler("No token, authorization denied", 401));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'EMPLOYEE') {
            req.user = decoded;
            next();
        }
        else {

            return next(new ErrorHandler("Authorization denied", 401));
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', ok: false });
    }
};

exports.adminVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return next(new ErrorHandler("No token, authorization denied", 401));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'ADMIN') {
            req.user = decoded;
            next();
        }
        else {
            return next(new ErrorHandler("Authorization denied", 401));
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', ok: false });
    }
};


exports.teamLeadVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return next(new ErrorHandler("No token, authorization denied", 401));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'TEAMLEADER') {
            req.user = decoded;
            next();
        }
        else {
            return next(new ErrorHandler("Authorization denied", 401));
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', ok: false });
    }
};


exports.commonVerify = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return next(new ErrorHandler("No token, authorization denied", 401));

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'TEAMLEADER' || decoded.role === "'EMPLOYEE'") {
            req.user = decoded;
            next();
        }
        else {
            return next(new ErrorHandler("Authorization denied", 401));
        }
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid', ok: false });
    }
};

