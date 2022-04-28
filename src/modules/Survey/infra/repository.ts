import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { ISurveyDocument } from "../interfaces/document.interface";
import { CommonConst } from "../../shared/constant/index";
import { CommonUtils } from "../../shared/classes/class-utils";
import _ = require("lodash");
import { ISurvey } from "../interfaces/base.interface";

@Injectable()
export class SurveyRepository {
  private readonly context = SurveyRepository.name;
  constructor(
    @Inject(CommonConst.SURVEY_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<ISurveyDocument>
  ) {}

  /**
   * Hàm lấy tất cả record theo điều kiện
   * @param query Điều kiện query
   * @param projection Các trường cần lấy ra
   * @returns
   */
  async find(query: any, projection = {}): Promise<ISurvey[]> {
    return await this.readModel.find(query, projection).lean().exec();
  }

  /**
   * Hàm lấy một record theo điều kiện
   * @param query Điều kiện query
   * @param projection Các trường cần lấy ra
   * @returns
   */
  async findOne(query: any, projection = {}): Promise<ISurvey> {
    return await this.readModel.findOne(query, projection).lean().exec();
  }

  /**
   * Hàm lấy tất cả record theo điều kiện (Phân trang)
   * @param query Điều kiện query
   * @param projection Các trường cần lấy ra
   * @returns
   */
  async findAll(query: any, projection = {}): Promise<ISurvey[]> {
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

  /**
   * Hàm đếm số bản ghi theo điều kiện
   * @param query Điều kiện query
   * @returns
   */
  async countAll(query: any) {
    delete query.sort;
    delete query.isPaging;
    delete query.page;
    delete query.pageSize;
    return await this.readModel.countDocuments(query).exec();
  }

  /**
   * Hàm tạo mới bản ghi
   * @param model bản ghi
   * @returns
   */
  async create(model: any): Promise<any> {
    return await this.readModel.create(model);
  }

  /**
   * Hàm cập nhật (PUT - ghi đè toàn bộ) bản ghi
   * @param model bản ghi
   * @returns
   */
  async update(model: any): Promise<any> {
    return await this.readModel.updateOne({ id: model.id }, model).exec();
  }

  /**
   * Hàm xóa bản ghi
   * @param model bản ghi
   * @returns
   */
  async delete(model: any): Promise<any> {
    return await this.readModel.deleteOne({ id: model.id }).exec();
  }

  /**
   * Hàm cập nhật (PATCH - ghi đè một phần) bản ghi
   * @param id id bản ghi
   * @param patchModel các trường cần cập nhật
   * @returns
   */
  async patch(id: string, patchModel: any): Promise<any> {
    return await this.readModel.updateOne({ id }, { $set: patchModel }).exec();
  }

  /**
   * Hàm tạo mới nhiều bản ghi
   * @param listModel
   * @returns
   */
  async insertMany(listModel: any): Promise<any> {
    return await this.readModel.insertMany(listModel);
  }

  /**
   * Hàm cập nhật (PUT - ghi đè toàn bộ) nhiều bản ghi theo điều kiện
   * @param query Điều kiện query
   * @param updateModel bản ghi cập nhật
   * @returns
   */
  async updateMany(query: any, updateModel: any): Promise<any> {
    return await this.readModel.updateMany(query, updateModel).exec();
  }

  /**
   * Hàm cập nhật (PATCH - ghi đè một phần) nhiều bản ghi theo điều kiện
   * @param query Điều kiện query
   * @param patchModel các trường cập nhật
   * @returns
   */
  async patchMany(query: any, patchModel: any): Promise<any> {
    return await this.readModel.updateMany(query, { $set: patchModel }).exec();
  }
}
