import { Injectable } from "@nestjs/common";
import { EmployeeExportRepository } from "./repository";

@Injectable()
export class EmployeeExportService {
  private readonly context = EmployeeExportService.name;

  constructor(private readonly repository: EmployeeExportRepository) {}

  async find(query: any) {
    return await this.repository.find(query);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ id });
  }
}
