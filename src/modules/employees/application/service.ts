import { Injectable, BadRequestException } from "@nestjs/common";
import { EmployeeRepository } from "../infra/repository";
import {
  EmployeeResponseDto,
  EmployeePagingResponseDto,
} from "../web/dto/response.dto";
import {
  CreateEmployeeRequestDto,
  UpdateEmployeeRequestDto,
} from "../web/dto/request.dto";
import { ErrorConst } from "../../shared/constant/error.const";


const uuid = require("uuid");

@Injectable()
export class EmployeeService {
  private readonly context = EmployeeService.name;

  constructor(private readonly repository: EmployeeRepository) {}

  async findById(id: string): Promise<EmployeeResponseDto> {
    const model = await this.repository.findOne({ id });
    if (!model) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Employee"),
      });
    }
    return new EmployeeResponseDto(model);
  }

  async findAll(query: any = {}): Promise<EmployeePagingResponseDto> {
    const _query: any = {};
    if (query._fields) {
      _query._fields = query._fields;
    }
    if (query.q) {
      _query.$or = [{ name: { $regex: query.q, $options: "i" } }];
    }
    if (query.user && query.user.id) {
      _query["createdBy"] = query.user.id;
    }
    const page = query.page ? Number(query["page"]) : 1;
    const pageSize = query.pageSize ? Number(query["pageSize"]) : 10;
    _query.page = page;
    _query.pageSize = pageSize;
    _query.isPaging = true;
    const res = await Promise.all([
      await this.repository.findAll(_query),
      await this.repository.countAll(_query),
    ]);
    return new EmployeePagingResponseDto({
      rows: res[0].map((model) => new EmployeeResponseDto(model)),
      total: res[1],
      page,
      pageSize,
      totalPages: Math.floor((res[1] + pageSize - 1) / pageSize),
    });
  }

  async create(user: any, dto: CreateEmployeeRequestDto) {
    const model: any = { ...dto };
    if (model.id) {
      delete model.id;
    }
    model.id = uuid.v4();
    await this.repository.create(model);
    return { id: model.id };
  }
 
  async update(user: any, dto: UpdateEmployeeRequestDto) {
    const oldModel = await this.repository.findOne({ id: dto.id });
    if (!oldModel) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Employee"),
      });
    }
    const model = Object.assign(oldModel, dto);
    await this.repository.patch(model.id, model);
    return { id: model.id };
  }

  async delete(user: any, id: string) {
    await this.repository.delete({ id });
    return { id: id };
  }
}
