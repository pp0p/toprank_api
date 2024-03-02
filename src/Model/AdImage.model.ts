import mongoose from "mongoose";
import IAdImage from "../types/AdImage";
const AdImage = new mongoose.Schema<IAdImage>({
  path: {
    type: String,
    required: true,
  },
  type: {
    required: true,
    type: String,
  },
});

export default mongoose.model<IAdImage>("info", AdImage);
