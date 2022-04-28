import { pick } from "lodash";
import { ISurvey } from "../../interfaces/base.interface";

export class SurveyPagingResponseDto {
  rows: SurveyResponseDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  constructor(init?: Partial<SurveyPagingResponseDto>) {
    Object.assign(
      this,
      pick(init, ["rows", "total", "page", "pageSize", "totalPages"])
    );
  }
}

export class SurveyResponseDto {
  id: string;
  createdDate?: Date;
  createdBy?: string;
  modifiedDate?: Date;
  modifiedBy?: string;
  active?: string;
  // Custom fields

  constructor(init?: Partial<SurveyResponseDto | ISurvey>) {
    Object.assign(
      this,
      pick(init, [
        "id",
        "createdDate",
        "createdBy",
        "modifiedDate",
        "modifiedBy",
        "active",
        // Custom fields
      ])
    );
  }
}
