"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var team_controller_1 = __importDefault(require("../Controller/team.controller"));
var section_controller_1 = __importDefault(require("../Controller/section.controller"));
var project_controller_1 = __importDefault(require("../Controller/project.controller"));
var router = (0, express_1.Router)();
router.use("/team", team_controller_1.default);
router.use("/section", section_controller_1.default);
router.use("/project", project_controller_1.default);
exports.default = router;
