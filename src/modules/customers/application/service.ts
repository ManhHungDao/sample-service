import { Injectable, BadRequestException } from "@nestjs/common";
import { CustomerRepository } from "../infra/repository";
import {
  CustomerResponseDto,
  CustomerPagingResponseDto,
} from "../web/dto/response.dto";
import {
  CreateCustomerRequestDto,
  InsertCustomerRequestDto,
  UpdateCustomerRequestDto,
} from "../web/dto/request.dto";
import { ErrorConst } from "../../shared/constant/error.const";
const uuid = require("uuid");
const csv = require("csvtojson");
const csvFilePath =
  "E:/Documents/propcom_training/backend/sample-service/data/customer.csv";
@Injectable()
export class CustomerService {
  private readonly context = CustomerService.name;

  constructor(private readonly repository: CustomerRepository) {}

  async findById(id: string): Promise<CustomerResponseDto> {
    const model = await this.repository.findOne({ id });
    if (!model) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Customer"),
      });
    }
    return new CustomerResponseDto(model);
  }

  async findAll(query: any = {}): Promise<CustomerPagingResponseDto> {
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
    return new CustomerPagingResponseDto({
      rows: res[0].map((model) => new CustomerResponseDto(model)),
      total: res[1],
      page,
      pageSize,
      totalPages: Math.floor((res[1] + pageSize - 1) / pageSize),
    });
  }

  // async create(user: any, dto: CreateCustomerRequestDto) {
  //   const model: any = { ...dto };
  //   if (model.id) {
  //     delete model.id;
  //   }

  //   model.id = uuid.v4();
  //   await this.repository.create(model);
  //   return { id: model.id };
  // }

  async create(user: any, dto: CreateCustomerRequestDto) {
    const check = await this.repository.findOne({ phone: dto.phone });
    if (check) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.EXISTED, "Customer"),
      });
    } else {
      const model: any = { ...dto };
      if (model.id) {
        delete model.id;
      }
      model.id = uuid.v4();
      await this.repository.create(model);
      return new CustomerResponseDto(model);
    }
  }

  async insertMany(user: any, dto: InsertCustomerRequestDto) {
    // await csv()
    //   .fromFile(csvFilePath)
    //   .then((result) => {
    //     this.repository.insertMany(result);
    //     return new CustomerResponseDto(result);
    //   })
    //   .catch((err) => {
    //     throw new BadRequestException({
    //       errors: ErrorConst.Error(ErrorConst.CANT_APPROVE, "Employee"),
    //     });
    //   });
    const insertFile = await csv().fromFile(csvFilePath);
    this.repository.insertMany(insertFile).catch((err)=>{
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Customer"),
      });
    });
    return new CustomerResponseDto(insertFile);
  }

  async update(user: any, dto: UpdateCustomerRequestDto) {
    const oldModel = await this.repository.findOne({ id: dto.id });
    if (!oldModel) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Customer"),
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
