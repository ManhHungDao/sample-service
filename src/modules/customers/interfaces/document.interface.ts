import { Document } from "mongoose";
import { ICustomer } from "./base.interface";

export interface ICustomerDocument extends Document, ICustomer {
  id: string;
}
