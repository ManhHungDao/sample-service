import { Injectable, BadRequestException } from "@nestjs/common";
import { SurveyRepository } from "../infra/repository";
import {
  SurveyResponseDto,
  SurveyPagingResponseDto,
} from "../web/dto/response.dto";
import {
  CreateSurveyRequestDto,
  UpdateSurveyRequestDto,
} from "../web/dto/request.dto";
import { ErrorConst } from "../../shared/constant/error.const";
const uuid = require("uuid");

@Injectable()
export class SurveyService {
  private readonly context = SurveyService.name;

  constructor(private readonly repository: SurveyRepository) {}

  async findById(id: string): Promise<any> {
    const model = await this.repository.find({
      $or: [{ cusId: id }, { empId: id }],
    });
    if (!model) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Survey"),
      });
    }
    model.map((model) => {
      model = new SurveyResponseDto(model);
    });
    console.log(model);
    return model;
  }

  async findAll(query: any = {}): Promise<SurveyPagingResponseDto> {
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
    const test = new SurveyPagingResponseDto({
      rows: res[0].map((model) => new SurveyResponseDto(model)),
      total: res[1],
      page,
      pageSize,
      totalPages: Math.floor((res[1] + pageSize - 1) / pageSize),
    });
    return test;
  }

  async create(user: any, dto: CreateSurveyRequestDto) {
    const model: any = { ...dto };
    if (model.id) {
      delete model.id;
    }
    model.id = uuid.v4();
    // model.modifiedBy = user.id;
    // model.createdBy = user.id;
    await this.repository.create(model);
    return { id: model.id };
  }

  async update(user: any, dto: UpdateSurveyRequestDto) {
    const oldModel = await this.repository.findOne({ id: dto.id });
    if (!oldModel) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Survey"),
      });
    }
    const model = Object.assign(oldModel, dto);
    // model.modifiedBy = user.id;
    await this.repository.patch(model.id, model);
    return { id: model.id };
  }

  async delete(user: any, id: string) {
    await this.repository.delete({ id });
    return { id: id };
  }
}
