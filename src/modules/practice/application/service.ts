import { Injectable, BadRequestException } from "@nestjs/common";
import { PracticeRepository } from "../infra/repository";
import {
  PracticeResponseDto,
  PracticePagingResponseDto,
} from "../web/dto/response.dto";
import {
  CreatePracticeRequestDto,
  UpdatePracticeRequestDto,
} from "../web/dto/request.dto";
import { ErrorConst } from "../../shared/constant/error.const";
const uuid = require("uuid");

@Injectable()
export class PracticeService {
  private readonly context = PracticeService.name;

  constructor(private readonly repository: PracticeRepository) {}

  async findPublicById(id: string): Promise<PracticeResponseDto> {
    const model = await this.repository.findOne({
      id,
      active: true,
    });
    if (!model) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Practice"),
      });
    }
    return new PracticeResponseDto(model);
  }


  async findPublicAll(query: any = {}): Promise<PracticePagingResponseDto> {
    const _query: any = {
      active: true,
    };
    if (query._fields) {
      _query._fields = query._fields;
    }
    if (query.q) {
      _query.$or = [{ name: { $regex: query.q, $options: "i" } }];
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
    return new PracticePagingResponseDto({
      rows: res[0].map((model) => new PracticeResponseDto(model)),
      total: res[1],
      page,
      pageSize,
      totalPages: Math.floor((res[1] + pageSize - 1) / pageSize),
    });
  }

  async findById(id: string): Promise<PracticeResponseDto> {
    const model = await this.repository.findOne({ id });
    if (!model) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Practice"),
      });
    }
    return new PracticeResponseDto(model);
  }

  async findAll(query: any = {}): Promise<PracticePagingResponseDto> {
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
    return new PracticePagingResponseDto({
      rows: res[0].map((model) => new PracticeResponseDto(model)),
      total: res[1],
      page,
      pageSize,
      totalPages: Math.floor((res[1] + pageSize - 1) / pageSize),
    });
  }

  async create(user: any, dto: CreatePracticeRequestDto) {
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

  async update(user: any, dto: UpdatePracticeRequestDto) {
    const oldModel = await this.repository.findOne({ id: dto.id });
    if (!oldModel) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Practice"),
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
