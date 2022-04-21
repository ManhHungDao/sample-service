import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { CmdPatternConst } from "../shared/constant/cmd-pattern.const";

@Injectable()
export class LoggerClient {
  constructor(
    @Inject(QueueConst.LOGGER_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  async sendLog(content: any) {
    this.msgSenderService.subscribe(
      this.client,
      content,
      CmdPatternConst.SEND_LOG
    );
  }
}
