"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// Specify the destination folder for uploaded files
var destinationFolder = "./public/";
// Ensure the destination directory exists
if (!fs_1.default.existsSync(destinationFolder)) {
    fs_1.default.mkdirSync(destinationFolder);
}
// Define storage configuration for Multer
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder for uploaded files
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        // Get the file extension
        var fileExtension = file.originalname.split('.').pop();
        // Replace characters other than alphanumeric and spaces with underscores in the filename
        var sanitizedFileName = file.originalname.replace(/[^\w\s.]/gi, "_");
        // Specify the filename for uploaded files
        cb(null, "".concat(Date.now(), "-").concat(sanitizedFileName));
    },
});
// Create Multer instance with the storage configuration
var upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|jpeg|exe)$/)) {
            // upload only png, jpg, jpeg, and exe format
            return cb(new Error("Please upload an image with PNG, JPG, JPEG, or EXE format."));
        }
        cb(undefined, true);
    },
});
// Export the Multer middleware
exports.default = upload;
