import { Injectable } from "@nestjs/common";
import { PracticeExportRepository } from "./repository";

@Injectable()
export class PracticeExportService {
  private readonly context = PracticeExportService.name;

  constructor(private readonly repository: PracticeExportRepository) {}

  async find(query: any) {
    return await this.repository.find(query);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ id });
  }
}
