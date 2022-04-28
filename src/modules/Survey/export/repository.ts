import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { ISurveyDocument } from "../interfaces/document.interface";
import { CommonConst } from "../../shared/constant/index";
import { ISurvey } from "../interfaces/base.interface";

@Injectable()
export class SurveyExportRepository {
  constructor(
    @Inject(CommonConst.SURVEY_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<ISurveyDocument>
  ) {}

  async find(query: any, projection: any = {}): Promise<ISurvey[]> {
    return await this.readModel.find(query, projection).lean();
  }

  async findOne(query: any, projection: any = {}): Promise<ISurvey> {
    return await this.readModel.findOne(query, projection).lean();
  }
}
