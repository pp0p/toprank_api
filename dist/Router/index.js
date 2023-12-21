"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var info_1 = __importDefault(require("./info"));
var verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
var getAllinfo_controller_1 = __importDefault(require("../Controller/getAllinfo.controller"));
var message_1 = __importDefault(require("./message"));
var router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/message", message_1.default);
router.use("/getAllInfo", getAllinfo_controller_1.default);
router.use("/info", verifyToken_1.default, info_1.default);
exports.default = router;
