import { Module } from "@nestjs/common";
import { queryDatabaseProviders } from "./query.database.providers";

@Module({
  providers: [...queryDatabaseProviders],
  exports: [...queryDatabaseProviders],
})
export class QueryDatabaseModule {}
