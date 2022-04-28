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
  cusId: string;
  empId: string;
  createdDate: Date;
  content: {
    description: string;
    demand: string;
  };
  buy?: {
    budget?: Number;
    projectName?: string;
  };
  constructor(init?: Partial<SurveyResponseDto | ISurvey>) {
    Object.assign(
      this,
      pick(init, ["id", "cusId","empId", "createdDate", "content", "buy"])
    );
  }
}
