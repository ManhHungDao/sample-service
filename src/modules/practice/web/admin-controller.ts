import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
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
import { RolesGuard } from "../../../common/guards/roles.guard";
import { ACGuard, UseRoles } from "nest-access-control";
import { Usr } from "../../shared/decorator/user.decorator";
import { PermissionEnum } from "../../shared/enum/permission.enum";
import { ValidationPipe } from "../../../common/pipes/validation.pipe";
import {
  CreatePracticeRequestDto,
  UpdatePracticeRequestDto,
} from "./dto/request.dto";

@ApiBearerAuth()
@ApiUseTags("[Admin] Practice - API của Admin")
@Controller("v1/admin/practice")
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(LoggingInterceptor)
export class PracticeAdminController {
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
  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: PermissionEnum.PRACTICE_GET_ALL,
    action: "read",
    possession: "own",
  })
  @Get()
  async findAll(@Usr() user, @Query() query?: any) {
    return await this.service.findAll(query);
  }

  @ApiOperation({ title: "Find one" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: PermissionEnum.PRACTICE_GET_ID,
    action: "read",
    possession: "own",
  })
  @Get(":id")
  async findById(@Param("id") id: string) {
    return await this.service.findById(id);
  }

  @ApiOperation({ title: "Create" })
  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: PermissionEnum.PRACTICE_CREATE,
    action: "read",
    possession: "own",
  })
  @Post()
  async create(
    @Usr() user,
    @Body(new ValidationPipe()) dto: CreatePracticeRequestDto
  ) {
    return await this.service.create(user, dto);
  }

  @ApiOperation({ title: "Update" })
  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: PermissionEnum.PRACTICE_UPDATE,
    action: "read",
    possession: "own",
  })
  @Put()
  async update(
    @Usr() user,
    @Body(new ValidationPipe()) dto: UpdatePracticeRequestDto
  ) {
    return await this.service.update(user, dto);
  }

  @ApiOperation({ title: "Delete" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @UseGuards(RolesGuard, ACGuard)
  @UseRoles({
    resource: PermissionEnum.PRACTICE_DELETE,
    action: "read",
    possession: "own",
  })
  @Delete(":id")
  async delete(@Usr() user, @Param("id") id: string) {
    return await this.service.delete(user, id);
  }
}
