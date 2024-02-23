import mongoose from "mongoose";
import IServices from "../types/services";
const servicesSchema = new mongoose.Schema<IServices>({
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
export default mongoose.model<IServices>("services", servicesSchema);
