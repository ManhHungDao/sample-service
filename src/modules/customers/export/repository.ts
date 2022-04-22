import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { ICustomerDocument } from "../interfaces/document.interface";
import { CommonConst } from "../../shared/constant/index";
import { ICustomer } from "../interfaces/base.interface";

@Injectable()
export class CustomerExportRepository {
  constructor(
    @Inject(CommonConst.CUSTOMER_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<ICustomerDocument>
  ) {}

  async find(query: any, projection: any = {}): Promise<ICustomer[]> {
    return await this.readModel.find(query, projection).lean();
  }

  async findOne(query: any, projection: any = {}): Promise<ICustomer> {
    return await this.readModel.findOne(query, projection).lean();
  }
}
