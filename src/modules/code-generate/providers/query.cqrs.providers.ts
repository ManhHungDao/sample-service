import { Connection } from "mongoose";
import { QuerySchema } from "../schemas/query.schema";
import { CommonConst } from "../../shared/constant/common.const";

export const QueryProviders = [
  {
    provide: CommonConst.QUERY_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model(CommonConst.CODE_COLLECTION, QuerySchema),
    inject: [CommonConst.QUERY_CONNECTION_TOKEN],
  },
];
