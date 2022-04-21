import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { IPracticeDocument } from "../interfaces/document.interface";
import { CommonConst } from "../../shared/constant/index";
import { IPractice } from "../interfaces/base.interface";

@Injectable()
export class PracticeExportRepository {
  constructor(
    @Inject(CommonConst.PRACTICE_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<IPracticeDocument>
  ) {}

  async find(query: any, projection: any = {}): Promise<IPractice[]> {
    return await this.readModel.find(query, projection).lean();
  }

  async findOne(query: any, projection: any = {}): Promise<IPractice> {
    return await this.readModel.findOne(query, projection).lean();
  }
}
