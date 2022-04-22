import { Connection } from "mongoose";
import { CustomerSchema } from "./schema";
import { CommonConst } from "../../shared/constant/index";

export const CustomerProviders = [
  {
    provide: CommonConst.CUSTOMER_QUERY_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model(CommonConst.CUSTOMER_COLLECTION, CustomerSchema),
    inject: [CommonConst.QUERY_CONNECTION_TOKEN],
  },
];
