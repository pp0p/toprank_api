import { Document } from "mongoose";
interface IMobileApp extends Document {
  name: string;
  imageCover: string;
  description: string;
  images: Array<String>;
}
export default IMobileApp;
