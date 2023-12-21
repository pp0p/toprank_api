import mongoose from "mongoose";
import IProject from "../types/project";
const projectSchema = new mongoose.Schema<IProject>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageCover: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IProject>("projects", projectSchema);
