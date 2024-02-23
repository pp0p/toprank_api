import mongoose from "mongoose";
import IHeaderAdImage from "../types/headerAdImage";
const hedaerAdSchema = new mongoose.Schema<IHeaderAdImage>({
  path: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IHeaderAdImage>("info", hedaerAdSchema);
