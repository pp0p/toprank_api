import { Document } from "mongoose";
interface IVisitor extends Document {
  count: number;
  isEnabled: boolean;
}
export default IVisitor
