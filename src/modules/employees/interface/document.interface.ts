import { Document } from "mongoose";
import { IPractice } from "./base.interface";

export interface IPracticeDocument extends Document, IPractice {
  id: string;
  //@todo: 
}
