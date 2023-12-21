"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var mongoose_1 = __importDefault(require("mongoose"));
var db = function () {
    mongoose_1.default
        .connect(config_1.config.mongoUri)
        .then(function () {
        console.log("[🗄️] Database Connected [🗄️]");
    })
        .catch(function (error) {
        console.error("[❌] Database Connection Error: \n", error);
    });
};
exports.default = db;
