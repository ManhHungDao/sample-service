import { Injectable } from "@nestjs/common";
import { LoggerClient } from "../mgs-sender/logger.client";
import { ConfigService } from "../config/config.service";

@Injectable()
export class MsxLoggerService {
  constructor(
    private readonly loggerClient: LoggerClient,
    private readonly configService: ConfigService
  ) {}

  async logLocal(context, message: string, data?: any) {
    if (this.configService.get("DEBUG") === "true") {
      console.log(
        `${new Date().toLocaleString()} - ${context} - ${message} `,
        JSON.stringify(data) || ""
      );
    }
  }

  async log(context, message: string, data?: any) {
    if (this.configService.get("DEBUG") === "true") {
      console.log(`${context} - ${message} `, data || "");
    }
    const content = {
      svcName: this.configService.get("SVC_NAME"),
      context,
      message,
      object: data,
    };
    this.loggerClient.sendLog(content);
  }

  async error(context, message: string, trace?: any) {
    if (this.configService.get("DEBUG") === "true") {
      console.log(`${context} - ${message} `, trace);
    }
    const content = {
      svcName: this.configService.get("SVC_NAME"),
      context,
      message,
      trace,
    };
    this.loggerClient.sendLog(content);
  }
}
