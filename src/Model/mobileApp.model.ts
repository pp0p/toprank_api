import IMobileApp from "../types/MobileApp";
import mongoose from "mongoose";
const MobileAppSchema = new mongoose.Schema<IMobileApp>({
  name: {
    type: String,
    required: true,
  },
  imageCover: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

const MobileAppModel = mongoose.model<IMobileApp>("MobileApp", MobileAppSchema);

export default MobileAppModel;
