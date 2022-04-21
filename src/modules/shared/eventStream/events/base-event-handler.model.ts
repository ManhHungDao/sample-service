import { IEvent } from "@nestjs/cqrs";
import { BaseEventStream } from "../models/base-event-stream.model";
import { CommandModel } from "../models/command.model";

export class BaseEventHandler implements IEvent {
  constructor(
    public readonly baseEventStream: BaseEventStream,
    public readonly commandModel: CommandModel,
    public readonly msg: string
  ) {}
}
