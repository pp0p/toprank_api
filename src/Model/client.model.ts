import mongoose from "mongoose";
import IClients from "../types/clients";
const clientsSchema = new mongoose.Schema<IClients>({
  number: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<IClients>("clients", clientsSchema);
