import { Document } from "mongoose";
import { ISurvey } from "./base.interface";

export interface ISurveyDocument extends Document, ISurvey {
  id: string;
}
