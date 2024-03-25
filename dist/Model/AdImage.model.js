"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var AdImage = new mongoose_1.default.Schema({
    path: {
        type: String,
        required: true,
    },
    type: {
        required: true,
        type: String,
    },
});
exports.default = mongoose_1.default.model("info", AdImage);
