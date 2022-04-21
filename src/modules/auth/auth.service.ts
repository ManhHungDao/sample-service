import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ClientProxy, Client, Transport } from "@nestjs/microservices";

import { Environments } from "../../environments/environment";
import { acRoles } from "./app.roles";
import { PermissionEnum } from "../shared/enum/permission.enum";
import { CommonConst, CmdPatternConst } from "../shared/constant/index";
import { StsClient } from "../mgs-sender/sts.client";
import { MsxLoggerService } from "../logger/logger.service";
import { CommonUtils } from "../shared/classes/class-utils";
import { ErrorConst } from "../shared/constant/error.const";

@Injectable()
export class AuthService {
  private readonly context = AuthService.name;
  constructor(
    private readonly stsClient: StsClient,
    private readonly loggerService: MsxLoggerService
  ) {}

  public async verify(payload) {
    const data = { data: payload.sub, svc: CommonConst.AGGREGATE_NAMES() };

    return await this.stsClient
      .signedUser(data)
      .then((rs) => {
        this.loggerService.logLocal(this.context, "AuthService/verify =>", rs);

        if (CommonUtils.objectNotEmpty(rs)) {
          return Promise.resolve(rs);
        }

        return Promise.reject(
          new UnauthorizedException({
            errors: ErrorConst.Error(ErrorConst.UNAUTHORIZED),
          })
        );
      })
      .catch((err) => {
        this.loggerService.error(this.context, "has error => ", err);
        return Promise.reject(
          new UnauthorizedException({
            errors: ErrorConst.Error(ErrorConst.UNAUTHORIZED),
          })
        );
      });
  }
}
