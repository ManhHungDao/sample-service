import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { CmdPatternConst } from "../shared/constant/cmd-pattern.const";

@Injectable()
export class MailerClient {
  constructor(
    @Inject(QueueConst.MAILER_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  async sendData(content: any, cmdPatern: string) {
    this.msgSenderService.subscribe(this.client, content, cmdPatern);
  }
}
