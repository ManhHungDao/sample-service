import * as mongoose from "mongoose";
import uuid = require("uuid");

export const CustomerSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String, default: uuid.v4, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  EMAIL: { type: String, required: true },
  takeCareBy: { type: String, default: "" },
  address: { type: String },
  createdDate: { type: Date, default: () => Date.now(), index: true }, // Đánh index
});

CustomerSchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
