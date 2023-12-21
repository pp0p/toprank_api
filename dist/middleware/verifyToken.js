"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = require("../config/config");
var verifyToken = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        jsonwebtoken_1.default.verify(token, config_1.config.jwtSecert, function (err) {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            next();
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Internal Server Error" });
    }
};
exports.default = verifyToken;
