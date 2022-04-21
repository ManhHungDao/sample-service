import * as mongoose from "mongoose";
import uuid = require("uuid");

export const EmployeeSchema = new mongoose.Schema({
  _id: { type: String },
  description: { type: String, default: "" },
  createdBy: { type: String, required: true },
  modifiedBy: { type: String, required: true },
  modifiedDate: { type: Date, default: () => Date.now(), index: true },
  createDate: { type: Date, default: () => Date.now(), index: true },
  id: { type: String, default: uuid.v4(), required: true },
  active: { type: Boolean, default: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, required: true },
});

// EmployeeSchema.pre("save", (next) => {
//   this._id = this.get("id");
//   next();
// });

EmployeeSchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
