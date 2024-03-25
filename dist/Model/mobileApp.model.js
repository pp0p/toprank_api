"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var MobileAppSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    imageCover: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
    },
});
var MobileAppModel = mongoose_1.default.model("MobileApp", MobileAppSchema);
exports.default = MobileAppModel;
