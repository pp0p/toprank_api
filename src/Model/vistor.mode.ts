import { Schema, model, Document } from "mongoose";

import IVisitor from "../types/Visitor";
const VisitorSchema = new Schema<IVisitor>({
  count: {
    type: Number,
    required: true,
  },
  isEnabled: {
    type: Boolean,
    required: true,
  },
});

const VisitorModel = model<IVisitor>("Visitor", VisitorSchema);

export default VisitorModel;
