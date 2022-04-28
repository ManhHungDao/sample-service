import * as mongoose from "mongoose";
import uuid = require("uuid");

export const SurveySchema = new mongoose.Schema({
  _id: { type: String },
  cusId: { type: String, require: true },
  empId: { type: String, require: true },
  createdDate: { type: Date, default: () => Date.now(), index: true },
  content: {
    description: { type: String, require: true },
    demand: { type: String, default: "" },
  },
  buy: {
    budget: { type: Number },
    projectName: { type: String },
  },
  id: { type: String, default: uuid.v4, index: true },
});

SurveySchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
