import { Injectable, Inject } from "@nestjs/common";
import { QueueConst } from "../shared/constant/queue.const";
import { MsgSenderService } from "./mgs.sender.service";
import { ClientProxy } from "@nestjs/microservices";
import { CmdPatternConst } from "../shared/constant/cmd-pattern.const";

@Injectable()
export class NotificationClient {
  constructor(
    @Inject(QueueConst.NOTIFIER_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  // sendNotification(type, receivers, sender, entityId) {
  //     let msg;
  //     switch (type) {
  //         case 'customerBooking': {
  //             msg = {
  //                 title: `Khách hàng đặt lịch hẹn`,
  //                 content: `Khách hàng đã đặt một lịch hẹn với bạn. Hãy vào kiểm tra`,
  //                 entityName: 'booking-calendar',
  //                 entityId,
  //                 eventName: 'bookingCalendar'
  //             };
  //             break;
  //         }
  //         case 'changePwd': {
  //             msg = {
  //                 title: `Thay đổi password.`,
  //                 content: `Password của bạn đã được thay đổi.`,
  //                 entityName: 'user',
  //                 entityId,
  //                 eventName: 'changedPassword'
  //             };
  //             break;
  //         }
  //     }

  //     if (CommonUtils.objectNotEmpty(msg)) {
  //         this.sendData({ msg, sender, receivers });
  //     }
  // }

  // sendNotification(model, eventName) {
  //     this.sendData({ msg, sender, receivers });
  //     // this.notifierClient.sendNotify('notification', '', { msg, sender, receivers });
  // }

  private sendData(content: any) {
    this.msgSenderService.subscribe(
      this.client,
      content,
      CmdPatternConst.NOTIFICATION.MESSAGE
    );
  }
}
