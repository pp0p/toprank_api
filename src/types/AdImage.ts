import { Document } from "mongoose";
interface IAdImage extends Document {
  path: string;
  type: string;
}
export default IAdImage;
