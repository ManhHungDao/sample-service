import { pick } from "lodash";
import { IPractice } from "../../interfaces/base.interface";

export class PracticePagingResponseDto {
  rows: PracticeResponseDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  constructor(init?: Partial<PracticePagingResponseDto>) {
    Object.assign(
      this,
      pick(init, ["rows", "total", "page", "pageSize", "totalPages"])
    );
  }
}

export class PracticeResponseDto {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  active: string;
  // Custom fields

  constructor(init?: Partial<PracticeResponseDto | IPractice>) {
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
