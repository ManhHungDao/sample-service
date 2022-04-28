
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from "@nestjs/swagger";
import { SurveyService } from "../application/service";
import { LoggingInterceptor } from "../../../common/interceptors/logging.interceptor";
import { CreateSurveyRequestDto, UpdateSurveyRequestDto } from "./dto/request.dto";
import { Usr } from "../../shared/decorator/user.decorator";

@ApiUseTags("[Public] Survey - API public")
@Controller("v1/public/survey")
@UseInterceptors(LoggingInterceptor)
export class SurveyPublicController {
  constructor(private readonly service: SurveyService) {}

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
  findPublicAll(@Query() query?: any) {
    console.log('Find All Survey');
    return this.service.findAll({ ...query });
  }


  @ApiOperation({ title: "Find one Survey bi Cus_ID" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/customer/:id")
  findByCusId(@Param("id") id: string) {
    return this.service.findById(id);
  }

  @ApiOperation({ title: "Find one Survey bi Emp_ID" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/employee/:id")
  findByEmpId(@Param("id") id: string) {
    return this.service.findById(id);
  }

  @ApiOperation({ title: "Create" })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateSurveyRequestDto
  ) {
    console.log("Create Servey Completed!")
    return await this.service.create(null, dto);
  }

  @ApiOperation({ title: "Update" })
  @Put()
  async update(
    @Body(new ValidationPipe()) dto: UpdateSurveyRequestDto
  ) {
    console.log("update Completed!")
    return await this.service.update(null, dto);
  }

  @ApiOperation({ title: "Delete" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    console.log("delete Completed")
    return await this.service.delete(null, id);
  }

}
