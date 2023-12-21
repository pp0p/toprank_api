"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var errorMiddleware = function (err, req, res, next) {
    if (err instanceof mongoose_1.Error.ValidationError) {
        // If the error is a Mongoose validation error
        var errorMessage = err.message; // Extract the error message
        res.status(400).json({
            error: "Validation Failed",
            message: errorMessage, // Send only the error message
        });
    }
    else {
        // If it's a different type of error, you can handle it accordingly
        // For example, you can use a default error response format
        res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
        });
    }
};
exports.default = errorMiddleware;
