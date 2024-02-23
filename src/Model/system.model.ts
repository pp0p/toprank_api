import mongoose from "mongoose";
import ISystems from "../types/system";
const systemsSchema = new mongoose.Schema<ISystems>({
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
  price:{
    type:Number,
    required:true
  },
  type:{
    type:String,
    required:true
  }
});
export default mongoose.model<ISystems>("systems", systemsSchema);
