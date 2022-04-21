import { Inject, Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { CommonConst } from "src/modules/shared/constant";
import { IPractice } from "../interface/base.interface";
import { IPracticeDocument } from "../interface/document.interface";

@Injectable()
export class EmployeeRepository {
  private readonly context = EmployeeRepository;
  constructor(
    @Inject(CommonConst.PRACTICE_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<IPracticeDocument>
  ) {}

  async find(query: any, projection = {}): Promise<IPractice[]> {
    return await this.readModel.find(query, projection).lean().exec();
  }

  async findOne(query: any, projection = {}) {
    return await this.readModel.findOne(query, projection).lean().exec();
  }
  //   async findALl(query: any, projection = {}): Promise<IPractice[]> {

  //   }
  async create(model: any): Promise<any> {
    return await this.readModel.create(model);
  }
  async update(model: any): Promise<any> {
    return await this.readModel.updateOne({ id: model.id }, model).exec();
  }
  async delete(model: any): Promise<any> {
    return await this.readModel.deleteOne({ id: model.id }).exec();
  }

  async path(id: string, pathModel: any): Promise<any> {
    return await this.readModel.updateOne({ id }, { $set: pathModel }).exec();
  }

  async insertMany(listModel: any): Promise<any> {
    return await this.readModel.insertMany({ listModel });
  }

  async updateMany(query: any, updateModel: any): Promise<any> {
    return await this.readModel.updateMany(query, updateModel).exec();
  }
  async pathMany(query: any, pathModel: any): Promise<any> {
    return await this.readModel.updateMany(query, { $set: pathModel }).exec();
  }
}
