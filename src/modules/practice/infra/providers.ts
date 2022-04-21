import { Connection } from "mongoose";
import { PracticeSchema } from "./schema";
import { CommonConst } from "../../shared/constant/index";

export const PracticeProviders = [
  {
    provide: CommonConst.PRACTICE_QUERY_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model(CommonConst.PRACTICE_COLLECTION, PracticeSchema),
    inject: [CommonConst.QUERY_CONNECTION_TOKEN],
  },
];
