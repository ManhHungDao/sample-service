import { Injectable } from "@nestjs/common";
import uuid = require("uuid");
import { EmployeeRepository } from "../infra/repository";
import {
  EmployeeReponseDto,
  EmployeePagingReponseDto,
} from "../web/dto/reponsive.dto";
import {
  CreateEmpoyeeRequestDto,
  UpdateEmpoyeeRequestDto,
} from "../web/dto/request.dto";
@Injectable()
export class EmployeeService {
  private readonly context = EmployeeService.name;

  constructor(private readonly repository: EmployeeRepository) {}

  async findPublicById(id: string): Promise<EmployeeReponseDto> {
    const model = await this.repository.findOne({ id, active: true });
    if (!model) {
      throw new Error();
    }
    return new EmployeeReponseDto(model);
  }
  async findById(id: string): Promise<EmployeeReponseDto> {
    const model = await this.repository.findOne({ id });
    if (!model) {
      throw new Error();
    }
    return new EmployeeReponseDto(model);
  }
  async findAll(query: any = {}): Promise<EmployeeReponseDto> {
    return new EmployeeReponseDto(query);
  }

  async create(user: any, dto: CreateEmpoyeeRequestDto) {
    const model: any = { ...dto };
    if (model.id) {
      delete model.id;
    }
    model.id = uuid.v4();
    await this.repository.create(model);
    return { id: model.id };
  }

  async update(user: any, dto: UpdateEmpoyeeRequestDto) {
    const oldModel = this.repository.findOne({ id: dto.id });
    if (!oldModel) {
      throw new Error();
    }
    const model = Object.assign(oldModel, dto);
    await this.repository.path(model.id, model);
    return { id: model.id };
  }

  async delete(user: any, id: string) {
    await this.repository.delete({ id });
    return { id: id };
  }
}
