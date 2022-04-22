import * as mongoose from "mongoose";
import uuid = require("uuid");

export const EmployeeSchema = new mongoose.Schema({
  _id: { type: String },
  description: { type: String, default: "" },
  createdBy: { type: String },
  createdDate: { type: Date, default: () => Date.now(), index: true }, 
  modifiedBy: { type: String },
  modifiedDate: { type: Date, default: () => Date.now(), index: true }, 
  id: { type: String, default: uuid.v4, index: true },
  active: { type: Boolean, default: true }, 
  name : { type: String, required: true },
  email : { type: String, required: true },
});

EmployeeSchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
