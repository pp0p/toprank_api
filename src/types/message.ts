import { Document } from "mongoose";

interface IMessage extends Document {
  name: string;
  title: string;
  message: string;
}
export default IMessage;
