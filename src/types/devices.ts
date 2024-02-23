import { Document } from "mongoose";

interface IDevices extends Document {
  name: string;
  description: string;
  image: string;
  price:number;
  type:string
}

export default IDevices;
