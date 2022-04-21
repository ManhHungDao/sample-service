import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { PracticeService } from "../application/service";
import { LoggingInterceptor } from "../../../common/interceptors/logging.interceptor";
import { Usr } from "../../shared/decorator/user.decorator";

@ApiBearerAuth()
@ApiUseTags("[Auth] Practice - API của TVV")
@Controller("v1/auth/practice")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor)
export class PracticeAuthController {
  constructor(private readonly service: PracticeService) {}

  @ApiOperation({ title: "Find all" })
  @ApiImplicitQuery({
    name: "page",
    required: true,
    description: "[Paging] page",
  })
  @ApiImplicitQuery({
    name: "pageSize",
    required: true,
    description: "[Paging] pageSize",
  })
  @ApiImplicitQuery({
    name: "sort",
    required: false,
    isArray: true,
    description: "[Sort] sort",
  })
  @ApiImplicitQuery({
    name: "q",
    required: false,
    description: "[Filter] Search text",
  })
  @Get()
  findAll(@Usr() user, @Query() query?: any) {
    return this.service.findAll({ ...query, user });
  }

  @ApiOperation({ title: "Find one" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.service.findById(id);
  }
}
