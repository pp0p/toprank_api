import mongoose from "mongoose";
import IProject from "../types/project";
const projectSchema = new mongoose.Schema<IProject>({
  link: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IProject>("projects", projectSchema);
