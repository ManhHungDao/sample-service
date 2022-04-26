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
import _ from "lodash";
const uuid = require("uuid");
const csv = require("csvtojson");
const csvFilePath =
  "E:/Documents/propcom_training/backend/sample-service/data/customer.csv";
@Injectable()
export class CustomerService {
  private readonly context = CustomerService.name;

  constructor(private readonly repository: CustomerRepository) {}

  async findById(takeCareBy: string): Promise<CustomerResponseDto> {
    const model: any = await this.repository.find({ takeCareBy });
    if (!model) {
      throw new BadRequestException({
        errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Customer"),
      });
    }
    return model;
  }

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
    const insertFile = await csv().fromFile(csvFilePath);
    await this.repository.insertMany(insertFile).catch((err) => {
      console.log(err)
    });
    for (const key in insertFile) {
      insertFile[key] = new CustomerResponseDto(insertFile[key]);
    }
    return insertFile;
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

  async updateMany(query: any, idEmployee: string, isBusiness: boolean) {
    // const updateBusiness = await this.repository.findOne({});
    if (isBusiness) {
      this.repository
        .updateMany({ isBusiness: true }, { takeCareBy: idEmployee })
        .catch((err) => {
          throw new BadRequestException({
            errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Customer"),
          });
        });
      return { id: idEmployee, isBusiness: isBusiness };
    } else {
      this.repository
        .updateMany({ isBusiness: false }, { takeCareBy: idEmployee })
        .catch((err) => {
          throw new BadRequestException({
            errors: ErrorConst.Error(ErrorConst.NOT_FOUND, "Customer"),
          });
        });
      return { id: idEmployee, isBusiness: isBusiness };
    }
  }
}
