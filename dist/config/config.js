"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    username: String(process.env.USERNAME),
    password: String(process.env.PASSWORD),
    jwtSecert: String(process.env.JWT_SECERT),
    mongoUri: String(process.env.MONGO_URI),
    port: Number(process.env.PORT) || 5000,
    corsOption: {
        origin: ["https://dashboard.toprankiq.com", "https://toprankiq.com"],
        credentials: true,
    },
};
