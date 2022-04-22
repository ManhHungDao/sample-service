import { QueryDatabaseModule } from "../database/query/query.database.module";
import { AuthModule } from "../auth/auth.module";
import { LoggerModule } from "../.././modules/logger/logger.module";
import { MgsSenderModule } from "../mgs-sender/mgs-sender.module";

import { Module } from "@nestjs/common";
import { CustomerProviders } from "./infra/providers";
import { CustomerRepository } from "./infra/repository";
import { CustomerService } from "./application/service";

import { CustomerPublicController } from "./web/public-controller";

@Module({
  imports: [QueryDatabaseModule, AuthModule, LoggerModule, MgsSenderModule],
  controllers: [
    CustomerPublicController,
  ],
  providers: [...CustomerProviders, CustomerRepository, CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
