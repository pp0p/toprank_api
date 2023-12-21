"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var message_controller_1 = __importDefault(require("../Controller/message.controller"));
var router = (0, express_1.Router)();
router.use("/", message_controller_1.default);
exports.default = router;
