import {pick} from "lodash";
import {IPractice} from "../../interface/base.interface"

export class EmployeePagingReponseDto {
  row: EmployeeReponseDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  constructor(init?: Partial<EmployeePagingReponseDto>) {
    Object.assign(
      this,
      pick(init, ["row", "total", "page", "pageSize", "totalPages"])
    );
  }
}
export class EmployeeReponseDto {
  id: string;
  name: string;
  createDate: Date;
  createBy: string;
  constructor(init?: Partial<EmployeeReponseDto| IPractice>) {
    Object.assign(this, pick(init, ["id", "createDate", "createBy", "name"]));
  }
}
