import { Module } from "@nestjs/common";
import { JwtStrategy } from "./passport/jwt.strategy";
import { AuthService } from "./auth.service";
import { MgsSenderModule } from "../mgs-sender/mgs-sender.module";
import { LoggerModule } from "../logger/logger.module";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [MgsSenderModule, LoggerModule, ConfigModule],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
