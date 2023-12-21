import mongoose from "mongoose";
import IMessage from "../types/message";
const messageSchema = new mongoose.Schema<IMessage>({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IMessage>("messages", messageSchema);
