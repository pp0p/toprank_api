"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var config_1 = require("../config/config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    var authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send({ isAuthenticated: false, message: "Unauthorized: Missing Authorization header" });
    }
    var token = authorizationHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, config_1.config.jwtSecert, function (err) {
        if (err) {
            return res.status(401).send({ isAuthenticated: false, message: "Unauthorized: Invalid token" });
        }
        else {
            res.status(200).send({ isAuthenticated: true });
        }
    });
});
exports.default = router;
