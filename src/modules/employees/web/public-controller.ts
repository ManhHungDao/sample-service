import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from "@nestjs/swagger";
import { EmployeeService } from "../application/service";
import { LoggingInterceptor } from "../../../common/interceptors/logging.interceptor";
import {
  CreateEmpoyeeRequestDto,
  UpdateEmpoyeeRequestDto,
} from "./dto/request.dto";
import { Usr } from "../../shared/decorator/user.decorator";

@ApiUseTags("[Public] Employee - API public")
@Controller("v1/public/employee")
@UseInterceptors(LoggingInterceptor)
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @ApiOperation({ title: "Find one public" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get(":id")
  findPublicById(@Param("id") id: string) {
    return this.service.findPublicById(id);
  }

  @ApiOperation({ title: "Find one" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/private/:id")
  findById(@Param("id") id: string) {
    return this.service.findById(id);
  }

  @ApiOperation({ title: "Create" })
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateEmpoyeeRequestDto) {
    return await this.service.create(null, dto);
  }

  @ApiOperation({ title: "Update" })
  @Put()
  async update(@Body(new ValidationPipe()) dto: UpdateEmpoyeeRequestDto) {
    return await this.service.update(null, dto);
  }

  @ApiOperation({ title: "Delete" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.service.delete(null, id);
  }
}
