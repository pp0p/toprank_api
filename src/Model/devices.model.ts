import mongoose from "mongoose";
import IDevices from "../types/devices";
const deviceSchema = new mongoose.Schema<IDevices>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  betaLink: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IDevices>("devices", deviceSchema);
