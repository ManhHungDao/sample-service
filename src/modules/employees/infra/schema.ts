import * as mongoose from "mongoose";
import uuid = require("uuid");

export const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: String, required: true },
  salary: { type: Number, required: true },
  createdDate: { type: Date, default: () => Date.now(), index: true },
});

EmployeeSchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
