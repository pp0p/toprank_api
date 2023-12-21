import { Document } from "mongoose";

interface IMember extends Document {
  name: string;
  description: string;
  photoPath: string;
}

export default IMember;
