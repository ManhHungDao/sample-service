
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from "@nestjs/swagger";
import { PracticeService } from "../application/service";
import { LoggingInterceptor } from "../../../common/interceptors/logging.interceptor";
import { CreatePracticeRequestDto, UpdatePracticeRequestDto } from "./dto/request.dto";
import { Usr } from "../../shared/decorator/user.decorator";

@ApiUseTags("[Public] Practice - API public")
@Controller("v1/public/practice")
@UseInterceptors(LoggingInterceptor)
export class PracticePublicController {
  constructor(private readonly service: PracticeService) {}

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
    console.log('Find All public');
    return this.service.findPublicAll({ ...query });
  }

  @ApiOperation({ title: "Find one public" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get(":id")
  findPublicById(@Param("id") id: string) {
    return this.service.findPublicById(id);
  }

  @ApiOperation({ title: "Find one " })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/private/:id")
  findById(@Param("id") id: string) {
    return this.service.findById(id);
  }


  @ApiOperation({ title: "Create" })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreatePracticeRequestDto
  ) {
    console.log("create Completed!")
    return await this.service.create(null, dto);
  }

  @ApiOperation({ title: "Update" })
  @Put()
  async update(
    @Body(new ValidationPipe()) dto: UpdatePracticeRequestDto
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
