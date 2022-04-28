import { Injectable } from "@nestjs/common";
import { SurveyExportRepository } from "./repository";

@Injectable()
export class SurveyExportService {
  private readonly context = SurveyExportService.name;

  constructor(private readonly repository: SurveyExportRepository) {}

  async find(query: any) {
    return await this.repository.find(query);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ id });
  }
}
