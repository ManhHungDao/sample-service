import { MsxLoggerService } from "./logger.service";
import { Module } from "@nestjs/common";
import { ConfigModule } from "../config/config.module";
import { MgsSenderModule } from "../mgs-sender/mgs-sender.module";

@Module({
  imports: [ConfigModule, MgsSenderModule],
  providers: [MsxLoggerService],
  exports: [MsxLoggerService, LoggerModule],
})
export class LoggerModule {}
