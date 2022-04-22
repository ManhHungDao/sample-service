import { Connection } from "mongoose";
import { EmployeeSchema } from "./schema";
import { CommonConst } from "../../shared/constant/index";

export const EmployeeProviders = [
  {
    provide: CommonConst.EMPLOYEE_QUERY_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model(CommonConst.EMPLOYEE_COLLECTION, EmployeeSchema),
    inject: [CommonConst.QUERY_CONNECTION_TOKEN],
  },
];
