import { Injectable } from "@nestjs/common";
import { CustomerExportRepository } from "./repository";

@Injectable()
export class CustomerExportService {
  private readonly context = CustomerExportService.name;

  constructor(private readonly repository: CustomerExportRepository) {}

  async find(query: any) {
    return await this.repository.find(query);
  }

  async findOne(id: string) {
    return await this.repository.findOne({ id });
  }
}
