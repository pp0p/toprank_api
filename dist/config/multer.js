"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
// Define storage configuration for Multer
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder for uploaded files
        cb(null, "./public/");
    },
    filename: function (req, file, cb) {
        // Specify the filename for uploaded files
        cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    },
});
// Create Multer instance with the storage configuration
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // upload only png and jpg format
            return cb(new Error("Pleace Upload image !"));
        }
        cb(undefined, true);
    },
});
// Export the Multer middleware
exports.default = upload;
