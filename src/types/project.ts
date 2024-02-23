import { Document } from "mongoose";

interface IProject extends Document {
  logo: string;
  link: string;
}
export default IProject;
