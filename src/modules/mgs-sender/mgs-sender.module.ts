import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "../config/config.service";
import { LoggerClient } from "./logger.client";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { NotifierClient } from "./notifier.client";
import { StsClient } from "./sts.client";
import { MailerClient } from "./mailer.client";
import { NotificationClient } from "./notification.client";
import { EmployeeClient } from "./employee.client";
import { CustomerClient } from "./customer.client";
import { PropertyClient } from "./property.client";
import { OrgchartClient } from "./orgchart.client";
const RABBITMQ_URL = new ConfigService(`.env.${process.env.NODE_ENV}`).get(
  "RABBITMQ_URL"
);

@Module({
  imports: [
    ClientsModule.register([
      {
        name: QueueConst.LOGGER_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.LOGGER_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.NOTIFIER_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.NOTIFIER_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.NOTIFICATION_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.NOTIFICATION_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.STS_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.STS_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.MAILER_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.MAILER_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.EMPLOYEE_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.EMPLOYEE_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.CUSTOMER_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.CUSTOMER_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.PROPERTY_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.PROPERTY_QUEUE,
          queueOptions: { durable: false },
        },
      },
      {
        name: QueueConst.ORGCHART_QUEUE,
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QueueConst.ORGCHART_QUEUE,
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [
    LoggerClient,
    MsgSenderService,
    NotifierClient,
    StsClient,
    MailerClient,
    NotificationClient,
    EmployeeClient,
    CustomerClient,
    PropertyClient,
    OrgchartClient,
  ],
  exports: [
    LoggerClient,
    MsgSenderService,
    NotifierClient,
    StsClient,
    MailerClient,
    NotificationClient,
    EmployeeClient,
    CustomerClient,
    PropertyClient,
    OrgchartClient,
  ],
})
export class MgsSenderModule {}
