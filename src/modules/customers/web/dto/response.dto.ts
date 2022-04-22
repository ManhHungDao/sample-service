import { pick } from "lodash";
import { ICustomer } from "../../interfaces/base.interface";

export class CustomerPagingResponseDto {
  rows: CustomerResponseDto[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;

  constructor(init?: Partial<CustomerPagingResponseDto>) {
    Object.assign(
      this,
      pick(init, ["rows", "total", "page", "pageSize", "totalPages"])
    );
  }
}

export class CustomerResponseDto {
  id: string;
  name: string;
  phone: string;
  address: Date;
  createdDate: Date;
  constructor(init?: Partial<CustomerResponseDto | ICustomer>) {
    Object.assign(
      this,
      pick(init, ["id", "name", "phone", "address", "createdDate"])
    );
  }
}
