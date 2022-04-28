import { Connection } from "mongoose";
import { SurveySchema } from "./schema";
import { CommonConst } from "../../shared/constant/index";

export const SurveyProviders = [
  {
    provide: CommonConst.SURVEY_QUERY_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model(CommonConst.SURVEY_COLLECTION, SurveySchema),
    inject: [CommonConst.QUERY_CONNECTION_TOKEN],
  },
];
