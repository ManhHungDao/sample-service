import * as mongoose from "mongoose";
import { ConfigService } from "../../../modules/config/config.service";
import { CommonConst } from "../../../modules/shared/constant/common.const";
const Mongoose = mongoose.Mongoose;
const instance = new Mongoose();

export const queryDatabaseProviders = [
  {
    provide: CommonConst.QUERY_CONNECTION_TOKEN,
    useFactory: async (): Promise<typeof mongoose> => {
      (instance as any).Promise = global.Promise;
      const configService = new ConfigService(`.env.${process.env.NODE_ENV}`);
      const mongoUrl = configService.get("MONGODB_URL_READ_MODEL");
      instance.set("useCreateIndex", true);
      return await instance.connect(
        mongoUrl,
        { useNewUrlParser: true },
        (err) => {
          if (err) {
            console.log("Has error connect db", err);
            throw err;
          }
        }
      );
    },
  },
];
