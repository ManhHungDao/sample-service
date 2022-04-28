import { Module } from "@nestjs/common";
import { QueryDatabaseModule } from "../../database/query/query.database.module";
import { AuthModule } from "../../auth/auth.module";
import { SurveyExportService } from "./service";
import { SurveyExportRepository } from "./repository";
import { LoggerModule } from "../../logger/logger.module";
import { MgsSenderModule } from "../../mgs-sender/mgs-sender.module";
import { ConfigModule } from "../../config/config.module";
import { SurveyProviders } from "../infra/providers";

@Module({
  imports: [
    QueryDatabaseModule,
    AuthModule,
    MgsSenderModule,
    LoggerModule,
    ConfigModule,
  ],
  providers: [
    ...SurveyProviders,
    SurveyExportRepository,
    SurveyExportService,
  ],
  exports: [SurveyExportService],
})
export class SurveyExportModule {}
