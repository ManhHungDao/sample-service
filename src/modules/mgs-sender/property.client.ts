import { MsgSenderService } from "./mgs.sender.service";
import { ClientProxy } from "@nestjs/microservices";
import { QueueConst } from "../shared/constant/queue.const";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class PropertyClient {
  constructor(
    @Inject(QueueConst.PROPERTY_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  sendData(content: any, cmdPattern) {
    this.msgSenderService.subscribe(this.client, content, cmdPattern);
  }
  async sendDataPromise(content: any, cmdPattern) {
    return await this.msgSenderService.promise(
      this.client,
      content,
      cmdPattern
    );
  }
}
