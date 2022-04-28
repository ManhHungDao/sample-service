import { QueryDatabaseModule } from "../database/query/query.database.module";
import { AuthModule } from "../auth/auth.module";
import { LoggerModule } from "../logger/logger.module";
import { MgsSenderModule } from "../mgs-sender/mgs-sender.module";

import { Module } from "@nestjs/common";
import { SurveyProviders } from "./infra/providers";
import { SurveyRepository } from "./infra/repository";
import { SurveyService } from "./application/service";
import { SurveyPublicController } from "./web/public-controller";

@Module({
  imports: [QueryDatabaseModule, AuthModule, LoggerModule, MgsSenderModule],
  controllers: [
    SurveyPublicController,
  ],
  providers: [...SurveyProviders, SurveyRepository, SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}
