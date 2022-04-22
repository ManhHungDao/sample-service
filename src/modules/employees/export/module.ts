import { Module } from "@nestjs/common";
import { QueryDatabaseModule } from "../../database/query/query.database.module";
import { AuthModule } from "../../auth/auth.module";
import { EmployeeExportService } from "./service";
import { EmployeeExportRepository } from "./repository";
import { LoggerModule } from "../../logger/logger.module";
import { MgsSenderModule } from "../../mgs-sender/mgs-sender.module";
import { ConfigModule } from "../../config/config.module";
import { EmployeeProviders } from "../infra/providers";

@Module({
  imports: [
    QueryDatabaseModule,
    AuthModule,
    MgsSenderModule,
    LoggerModule,
    ConfigModule,
  ],
  providers: [
    ...EmployeeProviders,
    EmployeeExportRepository,
    EmployeeExportService,
  ],
  exports: [EmployeeExportService],
})
export class EmployeeExportModule {}
