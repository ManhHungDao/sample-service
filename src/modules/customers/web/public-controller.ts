
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import {
  ApiUseTags,
  ApiImplicitQuery,
  ApiOperation,
  ApiImplicitParam,
} from "@nestjs/swagger";
import { CustomerService } from "../application/service";
import { LoggingInterceptor } from "../../../common/interceptors/logging.interceptor";
import { CreateCustomerRequestDto, UpdateCustomerRequestDto } from "./dto/request.dto";
import { Usr } from "../../shared/decorator/user.decorator";

@ApiUseTags("[Public] Customer - API public")
@Controller("v1/public/customer")
@UseInterceptors(LoggingInterceptor)
export class CustomerPublicController {
  constructor(private readonly service: CustomerService) {}

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
    console.log('Find All public customer');
    return this.service.findAll({ ...query });
  }


  @ApiOperation({ title: "Find one customer " })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Get("/:id")
  findById(@Param("id") id: string) {
    return this.service.findById(id);
  }


  @ApiOperation({ title: "Create" })
  @Post()
  async create(
    @Body(new ValidationPipe()) dto: CreateCustomerRequestDto
  ) {
    console.log("Create Customer Completed!")
    return await this.service.create(null, dto);
  }

  @ApiOperation({ title: "Update" })
  @Put()
  async update(
    @Body(new ValidationPipe()) dto: UpdateCustomerRequestDto
  ) {
    console.log("update customer Completed!")
    return await this.service.update(null, dto);
  }

  @ApiOperation({ title: "Delete" })
  @ApiImplicitParam({ name: "id", required: true, description: "Id" })
  @Delete(":id")
  async delete(@Param("id") id: string) {
    console.log("delete customer Completed")
    return await this.service.delete(null, id);
  }

}
