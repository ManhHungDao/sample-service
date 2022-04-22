import { Document } from "mongoose";
import { IEmployee } from "./base.interface";

export interface IEmployeeDocument extends Document, IEmployee {
  id: string;
}
