import multer from "multer";
import { Request } from "express";

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Specify the destination folder for uploaded files
    cb(null, "./public/");
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    // Specify the filename for uploaded files
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create Multer instance with the storage configuration
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb: Function) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Pleace Upload image !"));
    }
    cb(undefined, true);
  },
});

// Export the Multer middleware
export default upload;
