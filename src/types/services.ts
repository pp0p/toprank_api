import { Document } from "mongoose";

interface IServices extends Document{
  title: string;
  imageCover: string;
  description: string;
}
export default IServices;
