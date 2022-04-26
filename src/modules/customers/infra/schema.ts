import * as mongoose from "mongoose";
import uuid = require("uuid");

export const CustomerSchema = new mongoose.Schema({
  _id: { type: String },
  id: { type: String, default: uuid.v4, index: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  isBusiness: { type: Boolean, default: false },
  createdDate: { type: Date, default: () => Date.now(), index: true },
  // takeCareBy: { type:String , ref : 'employees'}
  takeCareBy: { type: String, default: "" },
});

CustomerSchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
