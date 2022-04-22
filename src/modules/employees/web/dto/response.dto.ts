import { pick } from "lodash";
import { IEmployee} from "../../interfaces/base.interface";

export class EmployeePagingResponseDto {
  rows: EmployeeResponseDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  constructor(init?: Partial<EmployeePagingResponseDto>) {
    Object.assign(
      this,
      pick(init, ["rows", "total", "page", "pageSize", "totalPages"])
    );
  }
}

export class EmployeeResponseDto {
  id: string;
  createdDate: Date;
  createdBy: string;
  modifiedDate: Date;
  modifiedBy: string;
  active: string;

  constructor(init?: Partial<EmployeeResponseDto | IEmployee>) {
    Object.assign(
      this,
      pick(init, [
        "id",
        "createdDate",
        "createdBy",
        "modifiedDate",
        "modifiedBy",
        "active",
      ])
    );
  }
}
