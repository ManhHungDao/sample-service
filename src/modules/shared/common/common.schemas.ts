import * as mongoose from "mongoose";
import uuid = require("uuid");
export const InstallmentSchema = new mongoose.Schema(
  {
    // id: { type: String, default: uuid.v4},
    name: { type: String },
    value: { type: Number },
    expiredDays: { type: Number },
    isToContract: { type: Boolean, default: false },
  },
  { _id: false }
);
