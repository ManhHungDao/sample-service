import { Module } from "@nestjs/common";
import { ListenerController } from "./listener.controller";
import { PracticeModule } from "../practice/module";

@Module({
  imports: [PracticeModule],
  controllers: [ListenerController],
})
export class ListenerModule {}
