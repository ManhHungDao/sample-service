import { QueryDatabaseModule } from "../database/query/query.database.module";
import { AuthModule } from "../auth/auth.module";
import { LoggerModule } from "../.././modules/logger/logger.module";
import { MgsSenderModule } from "../mgs-sender/mgs-sender.module";

import { Module } from "@nestjs/common";
import { PracticeProviders } from "./infra/providers";
import { PracticeRepository } from "./infra/repository";
import { PracticeService } from "./application/service";
import { PracticeAdminController } from "./web/admin-controller";
import { PracticeAuthController } from "./web/auth-controller";
import { PracticePublicController } from "./web/public-controller";

@Module({
  imports: [QueryDatabaseModule, AuthModule, LoggerModule, MgsSenderModule],
  controllers: [
    PracticeAdminController,
    PracticeAuthController,
    PracticePublicController,
  ],
  providers: [...PracticeProviders, PracticeRepository, PracticeService],
  exports: [PracticeService],
})
export class PracticeModule {}
