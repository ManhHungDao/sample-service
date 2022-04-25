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
const path = require("path");
const express = require("express");
const csv = require("csvtojson");
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

  async insertMany(user: any, dto: InsertCustomerRequestDto) {
    // const link = express.static(path.join(__dirname, "data"));
    const link = "../../../../data/customer.csv";
    await csv().fromFile(link).then(result => {
      this.repository.insertMany(result);
    }).catch(err => {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Employee"),
      })
    });
    return link;
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
