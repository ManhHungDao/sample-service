import { ClientProxy } from "@nestjs/microservices";
import { Inject, Injectable } from "@nestjs/common";
import { MsgSenderService } from "./mgs.sender.service";
import { QueueConst } from "../shared/constant/queue.const";
import { CmdPatternConst } from "../shared/constant/cmd-pattern.const";
import { PermissionEnum } from "../shared/enum/permission.enum";
import { acRoles } from "../auth/app.roles";

@Injectable()
export class StsClient {
  constructor(
    @Inject(QueueConst.STS_QUEUE) private readonly client: ClientProxy,
    private readonly msgSenderService: MsgSenderService
  ) {}

  async signedUser(content: any) {
    return await this.msgSenderService.promise(
      this.client,
      content,
      CmdPatternConst.USER.SIGNED
    );
  }

  sendData(content: any, pattern: string) {
    console.log("content =>", content);
    this.msgSenderService.subscribe(this.client, content, pattern);
  }

  predefineAcl(): Object[] {
    return Object.keys(PermissionEnum).map((key) => ({
      role: PermissionEnum[key],
      resource: PermissionEnum[key],
      action: "read:own",
    }));
  }

  permissionList(): Object[] {
    return Object.keys(PermissionEnum).map((key) => PermissionEnum[key]);
  }

  setupPermission() {
    let permissions = this.predefineAcl();
    // permissions.push.apply(permissions, this.predefineAcl2()); add more permissions
    acRoles.setGrants(permissions);

    // try install feature
    permissions = this.permissionList();
    const permissionPackage = {
      permissions,
      msxName: CmdPatternConst.SERVICE_NAME,
    };
    const cmd = CmdPatternConst.SETUP_FEATURE;
    const data = [permissionPackage];
    this.sendData(data, cmd);
  }

  sendDataPromise(content: any, pattern: string) {
    return this.msgSenderService.promise(this.client, content, pattern);
  }

  async getMasterData() {
    return await this.msgSenderService.promise(
      this.client,
      "",
      CmdPatternConst.USER.GET_MASTER_DATA
    );
  }
}
