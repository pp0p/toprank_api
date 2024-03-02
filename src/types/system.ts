import { Document } from "mongoose";

interface ISystems extends Document{
  name: string;
  image: string;
  description: string;
  price:number;
  type:string;
  betaLink:string

}
export default ISystems;
