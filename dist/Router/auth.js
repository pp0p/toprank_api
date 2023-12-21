"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = __importDefault(require("../Controller/auth.controller"));
var authStatus_controller_1 = __importDefault(require("../Controller/authStatus.controller"));
var router = (0, express_1.Router)();
router.use("/auth-status", authStatus_controller_1.default);
router.use("/", auth_controller_1.default);
exports.default = router;
