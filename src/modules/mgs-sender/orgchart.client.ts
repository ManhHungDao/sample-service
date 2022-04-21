import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { CmdPatternConst, CommonConst } from "../shared/constant";

@Injectable()
export class OrgchartClient {
  constructor(
    @Inject(QueueConst.ORGCHART_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  sendData(content: any, pattern: string) {
    this.msgSenderService.subscribe(this.client, content, pattern);
  }

  sendDataPromise(content: any, pattern: string) {
    return this.msgSenderService.promise(this.client, content, pattern);
  }
}
