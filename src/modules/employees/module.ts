import { QueryDatabaseModule } from "../database/query/query.database.module";
import { AuthModule } from "../auth/auth.module";
import { LoggerModule } from "../.././modules/logger/logger.module";
import { MgsSenderModule } from "../mgs-sender/mgs-sender.module";

import { Module } from "@nestjs/common";
import { EmployeeProviders } from "./infra/providers";
import { EmployeeRepository } from "./infra/repository";
import { EmployeeService } from "./application/service";
import { EmployeePublicController } from "./web/public-controller";

@Module({
  imports: [QueryDatabaseModule, AuthModule, LoggerModule, MgsSenderModule],
  controllers: [
    EmployeePublicController,
  ],
  providers: [...EmployeeProviders, EmployeeRepository, EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
