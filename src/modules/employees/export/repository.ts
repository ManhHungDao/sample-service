import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { IEmployeeDocument } from "../interfaces/document.interface";
import { CommonConst } from "../../shared/constant/index";
import { IEmployee } from "../interfaces/base.interface";

@Injectable()
export class EmployeeExportRepository {
  constructor(
    @Inject(CommonConst.EMPLOYEE_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<IEmployeeDocument>
  ) {}

  async find(query: any, projection: any = {}): Promise<IEmployee[]> {
    return await this.readModel.find(query, projection).lean();
  }

  async findOne(query: any, projection: any = {}): Promise<IEmployee> {
    return await this.readModel.findOne(query, projection).lean();
  }
}
