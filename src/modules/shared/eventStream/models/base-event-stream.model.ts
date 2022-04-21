import { AggregateRoot } from "@nestjs/cqrs";
import { Payload } from "./payload.model";

export class BaseEventStream extends AggregateRoot {
  constructor() {
    super();
  }

  id: string;
  streamId: string;
  aggregate: string;
  aggregateId: string;
  context: string;
  streamRevision: number;
  commitId: string;
  commitSequence: number;
  payload: Payload;
  eventName: string;
  actionName: string;
  returnMessagePattern: string;
}
