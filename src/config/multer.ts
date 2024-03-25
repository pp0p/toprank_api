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
    // Get the file extension
    const fileExtension = file.originalname.split('.').pop();
    // Replace characters other than alphanumeric and spaces with underscores in the filename
    const sanitizedFileName = file.originalname.replace(/[^\w\s.]/gi, "_");
    // Specify the filename for uploaded files
    cb(null, `${Date.now()}-${sanitizedFileName}`);
  },
});


// Create Multer instance with the storage configuration
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|exe)$/)) {
      // upload only png, jpg, jpeg, and exe format
      return cb(new Error("Please upload an image with PNG, JPG, JPEG, or EXE format."));
    }
    cb(undefined, true);
  },
});

// Export the Multer middleware
export default upload;
