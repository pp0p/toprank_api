"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var clientsSchema = new mongoose_1.default.Schema({
    number: {
        type: Number,
        required: true,
    },
    isEnabled: {
        type: Boolean,
        required: true,
    },
});
exports.default = mongoose_1.default.model("clients", clientsSchema);
