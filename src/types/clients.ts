import { Document } from "mongoose";

interface IClients extends Document {
  number: number;
  isEnabled: boolean;
}
export default IClients;
