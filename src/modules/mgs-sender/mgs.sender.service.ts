import { DataMessagePattern } from "../shared/interfaces/messaging-pattern.interface";
import { Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class MsgSenderService {
  subscribe(client: ClientProxy, content: any, cmdPattern) {
    // send to another micro-service
    const pattern = { cmd: cmdPattern };
    const messagingPattern = new DataMessagePattern(content);
    client.send<any>(pattern, messagingPattern).subscribe();
  }

  promise(client: ClientProxy, content: any, cmdPattern) {
    // send to another micro-service
    const pattern = { cmd: cmdPattern };
    const messagingPattern = new DataMessagePattern(content);
    return client.send<any>(pattern, messagingPattern).toPromise();
  }
}
