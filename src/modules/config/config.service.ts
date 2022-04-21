import * as dotenv from "dotenv";
import * as fs from "fs";
import { Injectable } from "@nestjs/common";
import { join } from "path";
var path = require("path");

@Injectable()
export class ConfigService {
  constructor(filePath: string) {
    const path = join(__dirname, "..", "..", "..", filePath);

    dotenv.config({ path });
  }

  get(key: string): string {
    // console.log(`key: ${key} - value: `, process.env[key]);
    return process.env[key];
  }

  public getTemplateFileDownload(fileName: string): any {
    return join(__dirname, "../../", "template-files", fileName);
  }

  public getUploadFolderPath(): any {
    return join(__dirname, "..", "..", "generated-files");
  }
}
