import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { CmdPatternConst } from "../shared/constant/cmd-pattern.const";

@Injectable()
export class CustomerClient {
  constructor(
    @Inject(QueueConst.CUSTOMER_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}
  sendData(content: any, pattern: string) {
    console.log("content =>", pattern);
    this.msgSenderService.subscribe(this.client, content, pattern);
  }
}
