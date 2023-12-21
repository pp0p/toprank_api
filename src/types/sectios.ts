import { Document } from "mongoose";

interface ISection extends Document{
  title: string;
  imageCover: string;
  description: string;
}
export default ISection;
