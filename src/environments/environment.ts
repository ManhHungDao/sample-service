import { Injectable } from "@nestjs/common";

import * as dotenv from "dotenv";
import { join } from "path";

@Injectable()
export class Environments {
  public static setupConfig() {
    const path = join(__dirname, "..", "..", `.env.${process.env.NODE_ENV}`);
    console.log("env path => ", path);
    dotenv.config({ path: path });
  }
}
