import { Module, OnModuleInit } from "@nestjs/common";
import { RouterModule, Routes } from "nest-router";
import { AuthModule } from "./modules/auth/auth.module";
import { AccessControlModule } from "nest-access-control";
import { acRoles } from "./modules/auth/app.roles";
import { MgsSenderModule } from "./modules/mgs-sender/mgs-sender.module";
import { LoggerModule } from "./modules/logger/logger.module";
import { NotifierClient } from "./modules/mgs-sender/notifier.client";
import { ListenerModule } from "./modules/listener/listener.module";
import { StsClient } from "./modules/mgs-sender/sts.client";
import { PracticeModule } from "./modules/practice/module";

const routes: Routes = [
  { path: "", module: PracticeModule },
];

@Module({
  imports: [
    RouterModule.forRoutes(routes), // setup the routes
    AccessControlModule.forRoles(acRoles),
    LoggerModule,
    // MgsSenderModule,
    // AuthModule,
    // ListenerModule,
    PracticeModule,
  ],
})
export class ApplicationModule implements OnModuleInit {
  constructor(
    // private readonly stsClient: StsClient,
    // private readonly notifierClient: NotifierClient
  ) {}
  onModuleInit() {
    // this.notifierClient.setupNotify();
    // this.stsClient.setupPermission();
  }
}
