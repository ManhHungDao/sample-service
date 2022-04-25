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
  CreateEmployeeRequestDto,
  UpdateEmployeeRequestDto,
} from "./dto/request.dto";

@ApiUseTags("[Public] Employee - API public")
@Controller("v1/public/employee")
@UseInterceptors(LoggingInterceptor)
export class EmployeePublicController {
  constructor(private readonly service: EmployeeService) {}

  @ApiOperation({ title: "Find all public" })
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
  findAll(@Query() query?: any) {
    console.log("Find All employee");
    return this.service.findAll({ ...query });
  }

  @ApiOperation({ title: "Find one EMPLOYEE " })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/:id")
  findById(@Param("id") id: string) {
    return this.service.findById(id);
  }
  @ApiOperation({ title: "Create" })
  @Post()
  async create(@Body(new ValidationPipe()) dto: CreateEmployeeRequestDto) {
    console.log("Create Employee Completed!");
    return await this.service.create(null, dto);
  }


  @ApiOperation({ title: "Update" })
  @Put()
  async update(@Body(new ValidationPipe()) dto: UpdateEmployeeRequestDto) {
    console.log("Insert Employee Completed!");
    return await this.service.update(null, dto);
  }

  @ApiOperation({ title: "Delete" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    console.log("Delete Employee Completed");
    return await this.service.delete(null, id);
  }
}
