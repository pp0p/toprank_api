import mongoose from "mongoose";
import ISection from "../types/sectios";
const sectionSchema = new mongoose.Schema<ISection>({
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
export default mongoose.model<ISection>("sections", sectionSchema);
