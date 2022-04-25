import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { IEmployeeDocument } from "../interfaces/document.interface";
import { CommonConst } from "../../shared/constant/index";
import { CommonUtils } from "../../shared/classes/class-utils";
import _ = require("lodash");
import { IEmployee } from "../interfaces/base.interface";

@Injectable()
export class EmployeeRepository {
  constructor(
    @Inject(CommonConst.EMPLOYEE_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<IEmployeeDocument>
  ) {}


  async find(query: any, projection = {}): Promise<IEmployee[]> {
    return await this.readModel.find(query, projection).lean().exec();
  }


  
  async findOne(query: any, projection = {}): Promise<IEmployee> {
    return await this.readModel.findOne(query, projection).lean().exec();
  }

  async findAll(query: any, projection = {}): Promise<IEmployee[]> {
    let sort: any = {
      createdDate: -1,
    };
    if (!_.isEmpty(query.sort)) {
      sort = CommonUtils.transformSort(query.sort) || {
        createdDate: -1,
      };
      delete query.sort;
    }
    if (query.isPaging) {
      const page = query.page;
      const pageSize = query.pageSize;
      delete query.isPaging;
      delete query.page;
      delete query.pageSize;
      return await this.readModel
        .find(query, projection)
        .sort(sort)
        .skip(page * pageSize - pageSize)
        .limit(pageSize)
        .lean()
        .exec();
    } else {
      return await this.readModel
        .find(query, projection)
        .sort(sort)
        .lean()
        .exec();
    }
  }

  async countAll(query: any) {
    delete query.sort;
    delete query.isPaging;
    delete query.page;
    delete query.pageSize;
    return await this.readModel.countDocuments(query).exec();
  }

 
  async create(model: any): Promise<any> {
    return await this.readModel.create(model);
  }

  
  async update(model: any): Promise<any> {
    return await this.readModel.updateOne({ id: model.id }, model).exec();
  }

 
  async delete(model: any): Promise<any> {
    return await this.readModel.deleteOne({ id: model.id }).exec();
  }


  async patch(id: string, patchModel: any): Promise<any> {
    return await this.readModel.updateOne({ id }, { $set: patchModel }).exec();
  }

  
  async insertMany(listModel: any): Promise<any> {
    return await this.readModel.insertMany(listModel);
  }


  async updateMany(query: any, updateModel: any): Promise<any> {
    return await this.readModel.updateMany(query, updateModel).exec();
  }


  async patchMany(query: any, patchModel: any): Promise<any> {
    return await this.readModel.updateMany(query, { $set: patchModel }).exec();
  }
}
