import { Module } from "@nestjs/common";
import { domainDatabaseProviders } from "./domain.database.providers";

@Module({
  providers: [...domainDatabaseProviders],
  exports: [...domainDatabaseProviders],
})
export class DomainDatabaseModule {}
