import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { CmdPatternConst } from "../shared/constant/cmd-pattern.const";
import {
  InfoMessagePattern,
  ErrorMessagePattern,
} from "../shared/interfaces/messaging-pattern.interface";
import { CommonConst } from "../../modules/shared/constant";

@Injectable()
export class NotifierClient {
  constructor(
    @Inject(QueueConst.NOTIFIER_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  sendNotify(type, message, content, cmd?): any {
    if (type === "info") {
      return this.sendInfo(message, content);
    } else if (type === "error") {
      return this.sendError(message, content);
    }
  }

  private sendInfo(message: string, content: any): any {
    // send to another micro-service
    // const pattern = { cmd: CmdPatternConst.NOTIFY.INFO };
    const messagingPattern = new InfoMessagePattern(message, content);
    this.msgSenderService.subscribe(
      this.client,
      messagingPattern,
      CmdPatternConst.NOTIFY.INFO
    );
  }

  private sendError(message: string, content: any) {
    // send to another micro-service
    // const pattern = { cmd: CmdPatternConst.NOTIFY.ERROR };
    const messagingPattern = new ErrorMessagePattern(message, content);
    this.msgSenderService.subscribe(
      this.client,
      messagingPattern,
      CmdPatternConst.NOTIFY.ERROR
    );
  }

  setupNotify() {
    CommonConst.AGGREGATE_NAMES().forEach((aggregate) => {
      this.sendNotify(
        "info",
        aggregate,
        "Initialize info notify for " + aggregate
      );
      this.sendNotify(
        "error",
        aggregate,
        "Initialize error notify for " + aggregate
      );
    });
  }
}
