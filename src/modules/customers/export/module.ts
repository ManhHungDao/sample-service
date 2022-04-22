import { Module } from "@nestjs/common";
import { QueryDatabaseModule } from "../../database/query/query.database.module";
import { AuthModule } from "../../auth/auth.module";
import { CustomerExportService } from "./service";
import { CustomerExportRepository } from "./repository";
import { LoggerModule } from "../../logger/logger.module";
import { MgsSenderModule } from "../../mgs-sender/mgs-sender.module";
import { ConfigModule } from "../../config/config.module";
import { CustomerProviders } from "../infra/providers";

@Module({
  imports: [
    QueryDatabaseModule,
    AuthModule,
    MgsSenderModule,
    LoggerModule,
    ConfigModule,
  ],
  providers: [
    ...CustomerProviders,
    CustomerExportRepository,
    CustomerExportService,
  ],
  exports: [CustomerExportService],
})
export class CustomerExportModule {}
