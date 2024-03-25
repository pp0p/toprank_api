"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config/config");
var verifyToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: "Unauthorized: Missing Authorization header" });
        }
        var token = authorizationHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, config_1.config.jwtSecert, function (err) {
            if (err) {
                return res.status(401).json({ message: "Unauthorized: Invalid token" });
            }
            next();
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.default = verifyToken;
