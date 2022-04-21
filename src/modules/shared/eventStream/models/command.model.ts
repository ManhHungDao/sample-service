import { Payload } from "./payload.model";

export class CommandModel extends Payload {
  payload: any;

  constructor(payload: any) {
    super();
    this.payload = payload;
  }
}
