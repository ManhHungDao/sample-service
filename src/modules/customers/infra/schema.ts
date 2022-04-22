import * as mongoose from "mongoose";
import uuid = require("uuid");

export const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String },
  takeCareBy: { type: String, default: "" },
  address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  createdDate: { type: Date, default: () => Date.now(), index: true }, // Đánh index
});

CustomerSchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
