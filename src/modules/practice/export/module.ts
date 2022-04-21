import { Module } from "@nestjs/common";
import { QueryDatabaseModule } from "../../database/query/query.database.module";
import { AuthModule } from "../../auth/auth.module";
import { PracticeExportService } from "./service";
import { PracticeExportRepository } from "./repository";
import { LoggerModule } from "../../logger/logger.module";
import { MgsSenderModule } from "../../mgs-sender/mgs-sender.module";
import { ConfigModule } from "../../config/config.module";
import { PracticeProviders } from "../infra/providers";

@Module({
  imports: [
    QueryDatabaseModule,
    AuthModule,
    MgsSenderModule,
    LoggerModule,
    ConfigModule,
  ],
  providers: [
    ...PracticeProviders,
    PracticeExportRepository,
    PracticeExportService,
  ],
  exports: [PracticeExportService],
})
export class PracticeExportModule {}
