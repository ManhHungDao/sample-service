import { Document } from "mongoose";
import { IPayloadBased } from "../interfaces/payload-based.interface";
import { Payload } from "../models/payload.model";

export interface IEventStreamDocument extends Document {
  id: string;
  streamId: string;
  aggregate: string;
  aggregateId: string;
  context: string;
  streamRevision: number;
  commitId: string;
  commitSequence: number;

  payload: Payload;
}
