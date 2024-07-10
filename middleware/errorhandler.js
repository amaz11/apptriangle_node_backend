const ErrorHandler = require("../utils/erroHandeler");
module.exports.errorGlobal = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;

    if (error.code === "P1000") {
        const message = "Authentication failed against database server";
        error = new ErrorHandler(message, 400);
    }
    if (error.code === "P1008") {

        error = new ErrorHandler(error.message, 400);
    }

    if (error.code === "P2002") {
        const message = 'Unique constraint failed on the fields'
        error = new ErrorHandler(message, 400);
    }

    if (error.code === 'P2003') {
        const message = 'The specified related record does not exist. Please ensure you are referencing a valid record.'
        ErrorHandler(message, 400);

    }

    if (error.code === "P2025") {
        error = new ErrorHandler(error.message, 400);
    }

    if (error.name === "PrismaClientValidationError") {
        const message = "Unknown Argument or Argument is missing";
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode || 500).json({
        ok: false,
        success: false,
        code: error,
        error: error.message || "Internal Server Error",
    });
};