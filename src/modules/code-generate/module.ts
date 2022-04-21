import { Module } from "@nestjs/common";
import { CodeGenerateService } from "./service";
import { QueryDatabaseModule } from "../database/query/query.database.module";
import { CodeGenerateRepository } from "./repository/query.repository";
import { QueryProviders } from "./providers/query.cqrs.providers";

@Module({
  imports: [QueryDatabaseModule],
  providers: [CodeGenerateRepository, CodeGenerateService, ...QueryProviders],
  exports: [CodeGenerateRepository, CodeGenerateModule, CodeGenerateService],
})
export class CodeGenerateModule {}
