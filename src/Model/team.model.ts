import mongoose from "mongoose";
import IMember from "../types/member";
const teamSchema = new mongoose.Schema<IMember>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photoPath: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IMember>("team", teamSchema);
