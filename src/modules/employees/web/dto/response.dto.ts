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
  name: string;
  email: string;
  job: string;
  salary: string;
  createdDate?: Date;
  constructor(init?: Partial<EmployeeResponseDto | IEmployee>) {
    Object.assign(
      this,
      pick(init, [
        "id",
        "name",
        "email",
        "job",
        "salary",
        "createdDate"
      ])
    );
  }
}
