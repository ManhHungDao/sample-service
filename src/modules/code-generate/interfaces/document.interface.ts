import { Document } from "mongoose";

export interface ICodeGenerateDocument extends Document {
  name: String;
  index: number;
  prefix: String;
}
