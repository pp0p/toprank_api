import multer from "multer";
import { Request } from "express";
import fs from "fs";

// Specify the destination folder for uploaded files
const destinationFolder = "./public/";

// Ensure the destination directory exists
if (!fs.existsSync(destinationFolder)) {
  fs.mkdirSync(destinationFolder);
}

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Specify the destination folder for uploaded files
    cb(null, destinationFolder);
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Replace spaces and parentheses with underscores in the filename
    const sanitizedFileName = file.originalname.replace(/[^\w\s]/gi, "_");
    // Specify the filename for uploaded files
    cb(null, `${Date.now()}-${sanitizedFileName}`);
  },
});

// Create Multer instance with the storage configuration
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload an image with PNG, JPG, or JPEG format."));
    }
    cb(undefined, true);
  },
});

// Export the Multer middleware
export default upload;

