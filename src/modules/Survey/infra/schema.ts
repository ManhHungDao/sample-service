import * as mongoose from "mongoose";
import uuid = require("uuid");

export const SurveySchema = new mongoose.Schema({
  // Khai báo các field common
  _id: { type: String },
  description: { type: String, default: "" },
  createdBy: { type: String },
  createdDate: { type: Date, default: () => Date.now(), index: true }, // Đánh index
  modifiedBy: { type: String },
  modifiedDate: { type: Date, default: () => Date.now(), index: true }, // Đánh index
  id: { type: String, default: uuid.v4, index: true },
  active: { type: Boolean, default: true }, // Có public hay không?
  // Khai báo các field của riêng từng chức năng
  name : { type: String, required: true },
  email : { type: String, required: true },
  status : { type: String, required: true},
  code : { type: String, required: true },
  // createdAt : { type: String, required: true },
  createdAt : { type: Date, default: () => Date.now(), index: true },

});

SurveySchema.pre("save", function (next) {
  this._id = this.get("id");
  next();
});
