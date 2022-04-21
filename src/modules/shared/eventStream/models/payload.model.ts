import { IPayloadBased } from "../interfaces/payload-based.interface";
import { ClassBased } from "../../classes/class-based";

export class Payload extends ClassBased {
  createdDate: number;
  eventName: string;
  actionName: string;
  description: string;
  revision: number;

  id: string;
}
