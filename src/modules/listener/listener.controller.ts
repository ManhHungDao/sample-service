import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { CmdPatternConst, CommonConst } from "../shared/constant";
// import { EmployeeService } from "../employee.query/service";

@Controller("listener")
export class ListenerController {
  private readonly context = ListenerController.name;

  constructor() {}
}
